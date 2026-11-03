"""
Generates src/assets/f1-blueprint.svg: a chalk-style technical drawing of an
F1 car in a 3/4 front view with callout labels.

The car is a simplified 3D model (mm, x = forward, y = car-left, z = up).
Surfaces are tessellated into small facets, flat-shaded, and painted
back-to-front so nearer surfaces hide what is behind them (painter's
algorithm). Outlines are drawn only on silhouettes and chosen crease lines.

Run:  python scripts/generate_f1_blueprint.py
"""
import math
import os

OUT = os.path.join(os.path.dirname(__file__), "..", "src", "assets", "f1-blueprint.svg")

# ---------------------------------------------------------------- camera ----
TARGET = (2600.0, 0.0, 380.0)
CAMERA = (TARGET[0] + 5600.0, TARGET[1] - 5000.0, TARGET[2] + 5600.0)   # ~37 deg down
FOCAL = 1.0

# Key light: from the front-left-above (camera side)
LIGHT = None  # set after norm() is defined

SHADE_STRENGTH = 0.32   # 1.0 = fully shaded solid, 0.0 = flat hidden-line wireframe
BOARD = (0x17, 0x17, 0x17)
CHALK = (0xEB, 0xE8, 0xE1)


def sub(a, b): return (a[0] - b[0], a[1] - b[1], a[2] - b[2])
def add(a, b): return (a[0] + b[0], a[1] + b[1], a[2] + b[2])
def mul(a, k): return (a[0] * k, a[1] * k, a[2] * k)
def dot(a, b): return a[0] * b[0] + a[1] * b[1] + a[2] * b[2]
def cross(a, b): return (a[1] * b[2] - a[2] * b[1], a[2] * b[0] - a[0] * b[2], a[0] * b[1] - a[1] * b[0])


def norm(v):
    l = math.sqrt(dot(v, v)) or 1.0
    return (v[0] / l, v[1] / l, v[2] / l)


LIGHT = norm((0.35, -0.55, 0.75))
FWD = norm(sub(TARGET, CAMERA))
RIGHT = norm(cross(FWD, (0, 0, 1)))
UP = cross(RIGHT, FWD)


def project(p):
    d = sub(p, CAMERA)
    z = dot(d, FWD)
    return (FOCAL * dot(d, RIGHT) / z, -FOCAL * dot(d, UP) / z)


def depth(p):
    return dot(sub(p, CAMERA), FWD)


def centroid(pts):
    n = len(pts)
    return (sum(p[0] for p in pts) / n, sum(p[1] for p in pts) / n, sum(p[2] for p in pts) / n)


def shade(normal, lo=0.05, hi=0.30):
    """Mix factor toward chalk for a surface with this (unit) normal."""
    t = max(0.0, dot(normal, LIGHT))
    k = (lo + (hi - lo) * t) * SHADE_STRENGTH
    c = tuple(int(b + (ch - b) * k) for b, ch in zip(BOARD, CHALK))
    return "#%02x%02x%02x" % c


# --------------------------------------------------------------- drawing ----
# Each item: (depth, kind, data, css_class). Rendered back-to-front.
# kind "path": data = (points2d, closed, smooth)
# kind "fill": data = (points2d, inline_style_or_None)
items = []


def line3(points, cls="ln", closed=False, smooth=False, d=None, bias=0.0):
    if d is None:
        d = sum(depth(p) for p in points) / len(points)
    items.append((d - bias, "path", ([project(p) for p in points], closed, smooth), cls))


def fill3(points3d, cls="solid", normal=None, d=None, bias=0.0, style=None, lo=0.05, hi=0.30):
    if d is None:
        d = depth(centroid(points3d))
    if style is None and normal is not None:
        c = shade(normal, lo, hi)
        style = f"fill:{c};stroke:{c};stroke-width:0.8"   # stroke hides anti-aliasing seams between facets
    items.append((d - bias, "fill", ([project(p) for p in points3d], style), cls))


def poly_normal(pts):
    """Newell normal for a planar-ish polygon."""
    nx = ny = nz = 0.0
    for i in range(len(pts)):
        a, b = pts[i], pts[(i + 1) % len(pts)]
        nx += (a[1] - b[1]) * (a[2] + b[2])
        ny += (a[2] - b[2]) * (a[0] + b[0])
        nz += (a[0] - b[0]) * (a[1] + b[1])
    return norm((nx, ny, nz))


def facet(pts, orient="camera", outline=None, bias=0.0, lo=0.05, hi=0.30):
    """Shaded filled polygon. orient: 'camera' (face the viewer), 'up', or a point to face away from."""
    n = poly_normal(pts)
    c = centroid(pts)
    if orient == "camera":
        if dot(n, sub(CAMERA, c)) < 0:
            n = mul(n, -1)
    elif orient == "up":
        if n[2] < 0:
            n = mul(n, -1)
    else:
        if dot(n, sub(c, orient)) < 0:
            n = mul(n, -1)
    d = depth(c)
    fill3(pts, normal=n, d=d, bias=bias, lo=lo, hi=hi)
    if outline:
        line3(pts, outline, closed=True, d=d, bias=bias + 2)
    return d


def superellipse_ring(x, w, zb, zt, n=4.0, count=28, half=False):
    zc, h = (zb + zt) / 2, (zt - zb) / 2
    pts = []
    steps = count if not half else count // 2
    for i in range(steps + (1 if half else 0)):
        t = (math.pi if half else 2 * math.pi) * i / steps
        c, s = math.cos(t), math.sin(t)
        y = w * math.copysign(abs(c) ** (2 / n), c)
        z = zc + h * math.copysign(abs(s) ** (2 / n), s)
        pts.append((x, y, z))
    return pts


def subdivide(stations, step):
    """Insert intermediate stations so facets stay short along the car. Returns [(station, is_original)]."""
    out = []
    for a, b in zip(stations, stations[1:]):
        out.append((a, True))
        n = max(1, int(abs(a[0] - b[0]) / step))
        for i in range(1, n):
            t = i / n
            out.append((tuple(a[j] + (b[j] - a[j]) * t for j in range(4)), False))
    out.append((stations[-1], True))
    return out


def loft(stations, ring_idx=(), long_idx=(), count=28, n=4.0, half=False, step=140,
         silhouette_cls="ln", crease_cls="ln-ghost", ring_every=None, lo=0.05, hi=0.30):
    """Solid lofted body with hidden-line removal via back-to-front facet painting."""
    subdiv = subdivide(stations, step)
    rings = [superellipse_ring(x, w, zb, zt, n, count, half) for ((x, w, zb, zt), _) in subdiv]
    orig_pos = [i for i, (_, o) in enumerate(subdiv) if o]
    crease_stations = {orig_pos[j] for j in ring_idx if j < len(orig_pos)}
    if ring_every:
        crease_stations |= {i for i in range(len(rings)) if i % ring_every == 0}
    m = len(rings[0])
    seg = m if not half else m - 1          # facets around each station
    wrap = not half

    def centre(i):
        (x, w, zb, zt), _ = subdiv[i]
        return (x, 0.0, (zb + zt) / 2)

    facing, dep = {}, {}
    quads = {}
    for i in range(len(rings) - 1):
        for k in range(seg):
            k2 = (k + 1) % m
            q = [rings[i][k], rings[i][k2], rings[i + 1][k2], rings[i + 1][k]]
            nrm = poly_normal(q)
            c = centroid(q)
            if dot(nrm, sub(c, centre(i))) < 0:
                nrm = mul(nrm, -1)
            quads[(i, k)] = (q, nrm, c)
            facing[(i, k)] = dot(nrm, sub(CAMERA, c)) > 0
            dep[(i, k)] = depth(c)
            fill3(q, normal=nrm, d=dep[(i, k)], lo=lo, hi=hi)

    def edge(a, b, qa, qb, crease):
        fa, fb = facing.get(qa), facing.get(qb)
        ds = [dep[q] for q in (qa, qb) if q in dep]
        if not ds:
            return
        d = min(ds) - 2
        if fa is not None and fb is not None and fa != fb:
            line3([a, b], silhouette_cls, d=d)
        elif (fa is None or fb is None) and (fa or fb):
            line3([a, b], silhouette_cls, d=d)     # open end of the loft
        elif crease and (fa or fb):
            line3([a, b], crease_cls, d=d)

    # ring edges
    for i in range(len(rings)):
        for k in range(seg):
            k2 = (k + 1) % m
            edge(rings[i][k], rings[i][k2], (i - 1, k), (i, k), i in crease_stations)
    # longitudinal edges
    for i in range(len(rings) - 1):
        for k in range(m if wrap else m):
            qa, qb = (i, (k - 1) % m if wrap else k - 1), (i, k)
            if not wrap and (k == 0 or k == m - 1):
                continue                                # open edges sit inside the body
            edge(rings[i][k], rings[i + 1][k], qa, qb, k in long_idx)
    return rings


def strip(line_a, line_b, orient="up", outline="ln", end_lines=True, lo=0.05, hi=0.30):
    """Shaded surface between two polylines of equal length (wing elements, floor strips)."""
    ds = []
    for i in range(len(line_a) - 1):
        q = [line_a[i], line_a[i + 1], line_b[i + 1], line_b[i]]
        ds.append(facet(q, orient=orient, lo=lo, hi=hi))
    d = min(ds) - 2
    if outline:
        line3(line_a, outline, smooth=True, d=d)
        line3(line_b, outline, smooth=True, d=d)
        if end_lines:
            line3([line_a[0], line_b[0]], "ln-fine", d=d)
            line3([line_a[-1], line_b[-1]], "ln-fine", d=d)


def mirror(points):
    return [(x, -y, z) for (x, y, z) in points]


# ---- main body (nose -> cockpit -> sidepods -> coke bottle -> gearbox) -----
BODY = [
    (5350, 40, 265, 315),
    (5000, 90, 220, 385),
    (4600, 130, 185, 470),
    (4200, 170, 145, 555),
    (3700, 230, 105, 630),
    (3350, 290, 95, 645),
    (3205, 290, 95, 640),
    (3200, 600, 95, 600),
    (2650, 640, 95, 570),
    (2050, 560, 95, 545),
    (1500, 400, 105, 520),
    (1000, 230, 125, 480),
    (600, 150, 150, 430),
    (350, 120, 180, 400),
]
body_rings = loft(BODY, ring_every=2, long_idx=[0, 3, 7, 11, 14, 17, 21, 25], count=28)

# ---- engine cover + airbox (upper half only; base sits inside the body) ---
COVER = [
    (3250, 170, 600, 650),
    (3110, 165, 600, 700),
    (3100, 165, 600, 960),
    (2850, 160, 570, 910),
    (2200, 150, 540, 800),
    (1500, 110, 510, 700),
    (900, 70, 465, 560),
]
loft(COVER, ring_every=2, long_idx=[4, 7, 10], count=28, n=3.0, half=True, step=120)
# airbox intake opening (dark hole on the front of the cover)
# airbox intake: rounded opening on the vertical face, directly above the driver's head
airbox = superellipse_ring(3101, 110, 745, 935, n=2.5, count=24)
fill3(airbox, style="fill:#101010", bias=40)
line3(airbox, "ln", closed=True, smooth=True, bias=42)

# ---- cockpit opening ------------------------------------------------------
cockpit = []
for i in range(28):
    t = 2 * math.pi * i / 28
    cockpit.append((3350 + 330 * math.cos(t), 200 * math.sin(t), 652))
fill3(cockpit, style="fill:#0e0e0e", bias=40)
line3(cockpit, "ln", closed=True, smooth=True, bias=42)

# ---- halo (titanium hoop + centre strut, drawn as a tube) -----------------
def tube(points, bias=60.0):
    """Thick chalk outline with a dark core so the member reads as a round tube."""
    line3(points, "tube-outer", smooth=True, bias=bias)
    line3(points, "tube-inner", smooth=True, bias=bias + 1)


halo_left = [(2980, -320, 655), (3000, -335, 790), (3130, -340, 855), (3350, -305, 875), (3530, -175, 882), (3610, 0, 885)]
tube(halo_left + list(reversed(mirror(halo_left)))[1:])          # one continuous hoop, mount to mount
tube([(3610, 0, 885), (3700, 0, 790), (3790, 0, 640)])           # centre strut down to the chassis

# ---- sidepod inlets (dark openings on the sidepod faces) ------------------
for s in (-1, 1):
    inlet = [(3201, s * y, z) for (y, z) in [(330, 280), (575, 280), (585, 360), (585, 520), (540, 560), (330, 560), (320, 500)]]
    fill3(inlet, style="fill:#101010", bias=40)
    line3(inlet, "ln", closed=True, smooth=True, bias=42)

# ---- mirrors --------------------------------------------------------------
for s in (-1, 1):
    m = [(3420, s * 470, 680), (3420, s * 610, 690), (3400, s * 610, 760), (3400, s * 470, 750)]
    facet(m, orient="camera", outline="ln-fine", bias=30)
    line3([(3440, s * 300, 640), (3420, s * 470, 700)], "ln-fine", bias=30)

# ---- floor + diffuser (strips so painter's ordering works) ----------------
FLOOR = [(4150, 260, 60), (3500, 720, 60), (2400, 790, 60), (1300, 800, 60), (700, 700, 60), (600, 600, 60)]
floor_sub = []
for a, b in zip(FLOOR, FLOOR[1:]):
    n = max(1, int((a[0] - b[0]) / 220))
    for i in range(n):
        t = i / n
        floor_sub.append(tuple(a[j] + (b[j] - a[j]) * t for j in range(3)))
floor_sub.append(FLOOR[-1])
for s in (-1, 1):
    outer = [(x, s * w, z) for (x, w, z) in floor_sub]
    inner = [(x, s * min(w, 120), z) for (x, w, z) in floor_sub]
    strip(outer, inner, orient="up", outline=None, lo=0.03, hi=0.14)
    line3(outer, "ln", d=depth((1800, s * 700, 60)) - 2)
line3([(4150, -260, 60), (4150, 260, 60)], "ln-fine")

# ---- diffuser: upswept rear floor channels with vertical strakes ---------
DIFF = [(600, 60), (420, 85), (250, 150), (90, 245), (-60, 340)]       # (x, z) profile of the ramp
DW = 560                                                               # half width
for s in (-1, 1):
    outer = [(x, s * DW, z) for (x, z) in DIFF]
    inner = [(x, s * 150, z) for (x, z) in DIFF]
    strip(outer, inner, orient="up", outline=None, lo=0.03, hi=0.14)
    line3(outer, "ln", smooth=True, bias=3)
    line3([outer[-1], inner[-1]], "ln", bias=3)                         # trailing edge
    for yy in (330, 470):                                              # strakes (vertical fences)
        base = [(x, s * yy, z) for (x, z) in DIFF]
        top = [(x, s * yy, z + 110) for (x, z) in DIFF[1:]] 
        fence = [base[1], base[-1]] + list(reversed(top))
        facet(fence, orient="camera", outline="ln-fine", bias=4, lo=0.02, hi=0.12)
line3([(-60, -150, 340), (-60, 150, 340)], "ln-fine", bias=3)

# ---- front wing -----------------------------------------------------------
SPAN = 1000
for k in range(3):
    le, te = 5490 - k * 115, 5490 - k * 115 - 165
    lead, trail = [], []
    for i in range(25):
        y = -SPAN + 2 * SPAN * i / 24
        rise = max(0.0, (abs(y) - 260) / (SPAN - 260))
        z = 90 + k * 34 + 34 * rise * k
        lead.append((le, y, z))
        trail.append((te, y, z + 22 + 8 * k))
    strip(lead, trail, orient="up", outline="ln", lo=0.06, hi=0.34)
for s in (-1, 1):
    plate = [(5500, s * SPAN, 60), (5500, s * SPAN, 210), (5330, s * SPAN, 300), (5010, s * SPAN, 300), (4990, s * SPAN, 60)]
    facet(plate, orient="camera", outline="ln", lo=0.04, hi=0.22)
    # nose pylons
    line3([(5180, s * 45, 265), (5230, s * 45, 100)], "ln-fine", bias=5)

# ---- rear wing ------------------------------------------------------------
RW = 560
for s in (-1, 1):
    plate = [(430, s * RW, 560), (430, s * RW, 985), (0, s * RW, 1025), (-70, s * RW, 985), (-70, s * RW, 500), (160, s * RW, 480)]
    facet(plate, orient="camera", outline="ln", lo=0.04, hi=0.22)
for (x0, x1, z0, z1) in [(-50, 320, 820, 860), (-50, 190, 930, 985), (0, 260, 470, 500)]:
    a = [(x1, -RW + 2 * RW * i / 8, z0) for i in range(9)]
    b = [(x0, -RW + 2 * RW * i / 8, z1) for i in range(9)]
    strip(a, b, orient="up", outline="ln", end_lines=False, lo=0.06, hi=0.34)
line3([(380, -20, 400), (160, -20, 820)], "ln-fine")
line3([(380, 20, 400), (160, 20, 820)], "ln-fine")


# ---- suspension -----------------------------------------------------------
def suspension(hub_x, s, inner_pts, hub_y):
    hu, hl = (hub_x, s * hub_y, 470), (hub_x, s * hub_y, 235)
    (u1, u2, l1, l2, push_top) = inner_pts
    for a in (u1, u2):
        line3([hu, (a[0], s * a[1], a[2])], "ln")
    for a in (l1, l2):
        line3([hl, (a[0], s * a[1], a[2])], "ln")
    line3([(hub_x, s * (hub_y - 20), 250), (push_top[0], s * push_top[1], push_top[2])], "ln-fine")


for s in (-1, 1):
    suspension(4300, s, ((4520, 160, 520), (4060, 170, 500), (4560, 140, 200), (4000, 170, 170), (4150, 170, 560)), 640)
    suspension(700, s, ((920, 150, 480), (520, 150, 470), (980, 190, 180), (430, 150, 200), (820, 180, 470)), 590)


# ---- tyres ----------------------------------------------------------------
def convex_hull(pts):
    pts = sorted(set(pts))
    if len(pts) < 3:
        return pts

    def turn(o, a, b): return (a[0] - o[0]) * (b[1] - o[1]) - (a[1] - o[1]) * (b[0] - o[0])

    lower, upper = [], []
    for p in pts:
        while len(lower) >= 2 and turn(lower[-2], lower[-1], p) <= 0:
            lower.pop()
        lower.append(p)
    for p in reversed(pts):
        while len(upper) >= 2 and turn(upper[-2], upper[-1], p) <= 0:
            upper.pop()
        upper.append(p)
    return lower[:-1] + upper[:-1]


def tyre(cx, cy, cz, r, half_w):
    s = 1 if cy > 0 else -1
    y_out, y_in = cy + s * half_w, cy - s * half_w
    N = 48
    d = depth((cx, cy, cz))

    def circle(y, rad, x0=cx, z0=cz):
        return [(x0 + rad * math.cos(2 * math.pi * i / N), y, z0 + rad * math.sin(2 * math.pi * i / N)) for i in range(N)]

    # Base silhouette fill (covers everything behind the wheel)
    outer, inner = circle(y_out - s * 25, r), circle(y_in + s * 25, r)
    wall_o, wall_i = circle(y_out, r * 0.9), circle(y_in, r * 0.9)
    hull = convex_hull([project(p) for p in outer + inner + wall_o + wall_i])
    items.append((d, "fill", (hull, "fill:#1a1a1a;stroke:#1a1a1a;stroke-width:0.8"), "solid"))

    # Tread: shaded facets around the drum (only the camera-facing ones matter, rest are hidden)
    for i in range(N):
        j = (i + 1) % N
        q = [outer[i], outer[j], inner[j], inner[i]]
        t = 2 * math.pi * (i + 0.5) / N
        nrm = (math.cos(t), 0.0, math.sin(t))
        if dot(nrm, sub(CAMERA, centroid(q))) > 0:
            fill3(q, normal=nrm, d=d - 1, lo=0.04, hi=0.22)
            if i % 3 == 0:
                line3([outer[i], inner[i]], "ln-ghost", d=d - 3)

    # Face: whichever side points at the camera
    face_out_visible = dot(sub(CAMERA, (cx, y_out, cz)), (0, s, 0)) > 0
    face_y = y_out if face_out_visible else y_in
    face_n = (0.0, s if face_out_visible else -s, 0.0)
    face = circle(face_y, r * 0.9)
    fill3(face, normal=face_n, d=d - 4, lo=0.03, hi=0.16)
    line3(face, "ln", closed=True, smooth=True, d=d - 5)
    rim = circle(face_y, r * 0.62)
    fill3(rim, normal=face_n, d=d - 6, lo=0.06, hi=0.26)
    line3(rim, "ln", closed=True, smooth=True, d=d - 7)
    line3(circle(face_y, r * 0.5), "ln-fine", closed=True, smooth=True, d=d - 8)
    hub = circle(face_y, r * 0.12)
    fill3(hub, style="fill:#0e0e0e", d=d - 9)
    line3(hub, "ln-fine", closed=True, smooth=True, d=d - 10)
    for i in range(0, N, 6):
        line3([circle(face_y, r * 0.5)[i], circle(face_y, r * 0.14)[i]], "ln-ghost", d=d - 10)

    # outer silhouette line
    items.append((d - 11, "path", (hull, True, False), "ln"))


tyre(4300, -810, 360, 360, 185)
tyre(4300, 810, 360, 360, 185)
tyre(700, -800, 370, 370, 225)
tyre(700, 800, 370, 370, 225)

# ---- construction lines ---------------------------------------------------
line3([(5800, 0, 0), (-400, 0, 0)], "ln-construct", d=1e9)
line3([(4300, -1300, 0), (4300, 1300, 0)], "ln-construct", d=1e9)
line3([(700, -1300, 0), (700, 1300, 0)], "ln-construct", d=1e9)

# ---------------------------------------------------------------- labels ----
LABELS = [
    # text, anchor (3D), preferred direction (dx, dy) in output px; text is pushed along it until clear of the car
    ("FRONT WING", (5420, -900, 200), (30, 50)),
    ("NOSE CONE", (5000, 0, 380), (90, -60)),
    ("FRONT SUSPENSION", (4220, -400, 410), (90, -110)),
    ("FRONT TYRE", (4300, -960, 70), (-70, 60)),
    ("HALO", (3350, -305, 875), (60, -80)),
    ("SIDEPOD INLET", (3201, -470, 420), (-100, 40)),
    ("AIRBOX INTAKE", (3101, 0, 935), (-40, -90)),
    ("ENGINE COVER", (2200, 0, 800), (30, -100)),
    ("FLOOR", (2400, -790, 60), (-90, 60)),
    ("REAR TYRE", (700, -1025, 370), (-90, 70)),
    ("REAR WING", (-50, -RW, 985), (-20, -50)),
    ("DIFFUSER", (-60, -560, 340), (-60, 50)),
]

# ------------------------------------------------------------------ output --
VB_W, VB_H = 1000, 760
MARGIN_X, MARGIN_TOP, MARGIN_BOTTOM = 70, 120, 110


def item_points(it):
    _, kind, data, _ = it
    return data[0]


def fit_transform():
    pts = []
    for it in items:
        if it[3] == "ln-construct":
            continue
        pts += item_points(it)
    xs, ys = [p[0] for p in pts], [p[1] for p in pts]
    sx = (VB_W - 2 * MARGIN_X) / (max(xs) - min(xs))
    sy = (VB_H - MARGIN_TOP - MARGIN_BOTTOM) / (max(ys) - min(ys))
    s = min(sx, sy)
    ox = (VB_W - s * (max(xs) - min(xs))) / 2 - s * min(xs)
    oy = MARGIN_TOP + (VB_H - MARGIN_TOP - MARGIN_BOTTOM - s * (max(ys) - min(ys))) / 2 - s * min(ys)
    return lambda p: (ox + s * p[0], oy + s * p[1])


T = fit_transform()


def fmt(p): return f"{p[0]:.1f},{p[1]:.1f}"


def path_d(pts, closed, smooth):
    pts = [T(p) for p in pts]
    if not smooth or len(pts) < 3:
        d = "M" + " L".join(fmt(p) for p in pts)
        return d + (" Z" if closed else "")
    n = len(pts)
    get = (lambda i: pts[i % n]) if closed else (lambda i: pts[max(0, min(n - 1, i))])
    segs = n if closed else n - 1
    d = "M" + fmt(pts[0])
    for i in range(segs):
        p0, p1, p2, p3 = get(i - 1), get(i), get(i + 1), get(i + 2)
        c1 = (p1[0] + (p2[0] - p0[0]) / 6, p1[1] + (p2[1] - p0[1]) / 6)
        c2 = (p2[0] - (p3[0] - p1[0]) / 6, p2[1] - (p3[1] - p1[1]) / 6)
        d += f" C{fmt(c1)} {fmt(c2)} {fmt(p2)}"
    return d + (" Z" if closed else "")


out = []
bounds = []
for (_, kind, data, cls) in sorted(items, key=lambda it: -it[0]):
    if kind == "fill":
        pts, style = data
        st = f' style="{style}"' if style else ""
        out.append(f'<path class="{cls}"{st} d="M{" L".join(fmt(T(p)) for p in pts)} Z"/>')
    else:
        pts, closed, smooth = data
        out.append(f'<path class="{cls}" d="{path_d(pts, closed, smooth)}"/>')

# Occupancy grid of everything drawn (so label text can be kept off the car)
CELL = 6
occupied = set()


def mark_seg(p, q):
    n = int(max(abs(q[0] - p[0]), abs(q[1] - p[1])) / CELL) + 1
    for i in range(n + 1):
        t = i / n
        occupied.add((int((p[0] + (q[0] - p[0]) * t) // CELL), int((p[1] + (q[1] - p[1]) * t) // CELL)))


for it in items:
    if it[3] == "ln-construct":
        continue
    pts = [T(p) for p in item_points(it)]
    if it[1] == "fill":
        xs, ys = [p[0] for p in pts], [p[1] for p in pts]
        for cx in range(int(min(xs) // CELL), int(max(xs) // CELL) + 1):
            for cy in range(int(min(ys) // CELL), int(max(ys) // CELL) + 1):
                occupied.add((cx, cy))
    else:
        for p, q in zip(pts, pts[1:]):
            mark_seg(p, q)


def rect_clear(x0, y0, x1, y1, margin=5):
    for cx in range(int((x0 - margin) // CELL), int((x1 + margin) // CELL) + 1):
        for cy in range(int((y0 - margin) // CELL), int((y1 + margin) // CELL) + 1):
            if (cx, cy) in occupied:
                return False
    return True


# ---- radial fan: one angle per label, spread apart, then pushed outward until clear
car_pts = [T(p) for it in items if it[3] != "ln-construct" for p in item_points(it)]
ccx = sum(p[0] for p in car_pts) / len(car_pts)
ccy = sum(p[1] for p in car_pts) / len(car_pts)

MIN_SEP = math.radians(19)
lab = []
for (text, anchor, (dx, dy)) in LABELS:
    a = T(project(anchor))
    hint = math.atan2(dy, dx)
    radial = math.atan2(a[1] - ccy, a[0] - ccx)
    # blend the hand hint with the pure radial direction
    ang = math.atan2(0.5 * math.sin(hint) + 0.5 * math.sin(radial), 0.5 * math.cos(hint) + 0.5 * math.cos(radial))
    lab.append([text, a, ang])
lab.sort(key=lambda l: l[2])
for _ in range(200):                      # relax angular spacing (with wrap-around)
    moved = False
    for i in range(len(lab)):
        j = (i + 1) % len(lab)
        gap = (lab[j][2] - lab[i][2]) % (2 * math.pi)
        if gap < MIN_SEP:
            push = (MIN_SEP - gap) / 2
            lab[i][2] -= push
            lab[j][2] += push
            moved = True
    if not moved:
        break


def seg_hits_rect(p, q, r, margin=6):
    x0, y0, x1, y1 = r[0] - margin, r[1] - margin, r[2] + margin, r[3] + margin
    n = int(math.hypot(q[0] - p[0], q[1] - p[1]) / 4) + 1
    for i in range(n + 1):
        t = i / n
        x, y = p[0] + (q[0] - p[0]) * t, p[1] + (q[1] - p[1]) * t
        if x0 <= x <= x1 and y0 <= y <= y1:
            return True
    return False


placed, leaders = [], []
for (text, a, ang0) in lab:
    width = 9.2 * len(text) + 6
    best = None
    # closest placement first; at each distance try the preferred angle, then small deviations either side
    for dist in range(36, 340, 8):
        for dev in (0, 5, -5, 10, -10, 16, -16, 23, -23, 31, -31, 40, -40):
            ang = ang0 + math.radians(dev)
            ux, uy = math.cos(ang), math.sin(ang)
            right = ux >= 0
            tip = (a[0] + ux * dist, a[1] + uy * dist)
            end = (tip[0] + (width if right else -width), tip[1])
            x0, x1 = min(tip[0], end[0]), max(tip[0], end[0])
            y0, y1 = tip[1] - 24, tip[1] + 4
            rect = (x0, y0, x1, y1)
            if not rect_clear(x0, y0, x1, y1):
                continue
            if not all(x1 < r[0] - 10 or x0 > r[2] + 10 or y1 < r[1] - 10 or y0 > r[3] + 10 for r in placed):
                continue
            if any(seg_hits_rect(p, q, rect) for (p, q) in leaders):      # old leaders vs new text
                continue
            if any(seg_hits_rect(a, tip, r) for r in placed):             # new leader vs old text
                continue
            best = (tip, end, rect, right)
            break
        if best:
            break
    if not best:
        ux, uy = math.cos(ang0), math.sin(ang0)
        tip = (a[0] + ux * 340, a[1] + uy * 340)
        right = ux >= 0
        end = (tip[0] + (width if right else -width), tip[1])
        best = (tip, end, (min(tip[0], end[0]), tip[1] - 24, max(tip[0], end[0]), tip[1] + 4), right)
    tip, end, rect, right = best
    placed.append(rect)
    leaders.append((a, tip))
    leaders.append((tip, end))
    out.append(f'<circle class="lbl-dot" cx="{a[0]:.1f}" cy="{a[1]:.1f}" r="2.6"/>')
    out.append(f'<path class="lbl-line" d="M{fmt(a)} L{fmt(tip)} L{fmt(end)}"/>')
    tx = tip[0] + 3 if right else end[0] + 3
    out.append(f'<text class="lbl-text" x="{tx:.1f}" y="{tip[1] - 7:.1f}">{text}</text>')
    bounds += [a, tip, end, (tip[0], tip[1] - 26), (end[0], tip[1] - 26)]

for it in items:
    if it[3] != "ln-construct":
        bounds += [T(p) for p in item_points(it)]
PAD = 24
bx0 = min(p[0] for p in bounds) - PAD
bx1 = max(p[0] for p in bounds) + PAD
by0 = min(p[1] for p in bounds) - PAD
by1 = max(p[1] for p in bounds) + PAD + 50  # room for the figure caption
out.append(f'<text class="lbl-title" x="{(bx0 + bx1) / 2:.0f}" y="{by1 - 22:.0f}" text-anchor="middle">'
           'FIG. 1 - OPEN-WHEEL RACE CAR, 3/4 FRONT VIEW</text>')
out.insert(0, f'<svg xmlns="http://www.w3.org/2000/svg" viewBox="{bx0:.0f} {by0:.0f} {bx1 - bx0:.0f} {by1 - by0:.0f}" preserveAspectRatio="xMidYMid meet" class="bp-car">')
out.append('</svg>')

os.makedirs(os.path.dirname(OUT), exist_ok=True)
with open(OUT, "w", encoding="utf-8") as f:
    f.write("\n".join(out) + "\n")
print("wrote", os.path.abspath(OUT), len(items), "items")
