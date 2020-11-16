function t2(t1, n, e) {
    if (t1 && t1.length) {
        const [o, s] = n, r = Math.PI / 180 * e, i = Math.cos(r), a = Math.sin(r);
        t1.forEach((t2)=>{
            const [n1, e1] = t2;
            t2[0] = (n1 - o) * i - (e1 - s) * a + o, t2[1] = (n1 - o) * a + (e1 - s) * i + s;
        });
    }
}
function n1(t1) {
    const n1 = t1[0], e = t1[1];
    return Math.sqrt(Math.pow(n1[0] - e[0], 2) + Math.pow(n1[1] - e[1], 2));
}
function e1(t1, n1, e1, o) {
    const s = n1[1] - t1[1], r = t1[0] - n1[0], i = s * t1[0] + r * t1[1], a = o[1] - e1[1], c = e1[0] - o[0], h = a * e1[0] + c * e1[1], u = s * c - a * r;
    return u ? [
        (c * i - r * h) / u,
        (s * h - a * i) / u
    ] : null;
}
function o1(t1, n1, e1) {
    const o1 = t1.length;
    if (o1 < 3) return !1;
    const a = [
        Number.MAX_SAFE_INTEGER,
        e1
    ], c = [
        n1,
        e1
    ];
    let h = 0;
    for(let n2 = 0; n2 < o1; n2++){
        const e2 = t1[n2], u = t1[(n2 + 1) % o1];
        if (i(e2, u, c, a)) {
            if (0 === r1(e2, c, u)) return s1(e2, c, u);
            h++;
        }
    }
    return h % 2 == 1;
}
function s1(t1, n1, e1) {
    return n1[0] <= Math.max(t1[0], e1[0]) && n1[0] >= Math.min(t1[0], e1[0]) && n1[1] <= Math.max(t1[1], e1[1]) && n1[1] >= Math.min(t1[1], e1[1]);
}
function r1(t1, n1, e1) {
    const o1 = (n1[1] - t1[1]) * (e1[0] - n1[0]) - (n1[0] - t1[0]) * (e1[1] - n1[1]);
    return 0 === o1 ? 0 : o1 > 0 ? 1 : 2;
}
function i(t1, n1, e1, o1) {
    const i1 = r1(t1, n1, e1), a = r1(t1, n1, o1), c = r1(e1, o1, t1), h = r1(e1, o1, n1);
    return i1 !== a && c !== h || !(0 !== i1 || !s1(t1, e1, n1)) || !(0 !== a || !s1(t1, o1, n1)) || !(0 !== c || !s1(e1, t1, o1)) || !(0 !== h || !s1(e1, n1, o1));
}
function a1(n1, e1) {
    const o1 = [
        0,
        0
    ], s1 = Math.round(e1.hachureAngle + 90);
    s1 && t2(n1, o1, s1);
    const r1 = function(t1, n2) {
        const e2 = [
            ...t1
        ];
        e2[0].join(",") !== e2[e2.length - 1].join(",") && e2.push([
            e2[0][0],
            e2[0][1]
        ]);
        const o2 = [];
        if (e2 && e2.length > 2) {
            let t2 = n2.hachureGap;
            t2 < 0 && (t2 = 4 * n2.strokeWidth), t2 = Math.max(t2, 0.1);
            const s2 = [];
            for(let t3 = 0; t3 < e2.length - 1; t3++){
                const n3 = e2[t3], o3 = e2[t3 + 1];
                if (n3[1] !== o3[1]) {
                    const t4 = Math.min(n3[1], o3[1]);
                    s2.push({
                        ymin: t4,
                        ymax: Math.max(n3[1], o3[1]),
                        x: t4 === n3[1] ? n3[0] : o3[0],
                        islope: (o3[0] - n3[0]) / (o3[1] - n3[1])
                    });
                }
            }
            if (s2.sort((t4, n3)=>t4.ymin < n3.ymin ? -1 : t4.ymin > n3.ymin ? 1 : t4.x < n3.x ? -1 : t4.x > n3.x ? 1 : t4.ymax === n3.ymax ? 0 : (t4.ymax - n3.ymax) / Math.abs(t4.ymax - n3.ymax)
            ), !s2.length) return o2;
            let r2 = [], i1 = s2[0].ymin;
            for(; r2.length || s2.length;){
                if (s2.length) {
                    let t4 = -1;
                    for(let n3 = 0; n3 < s2.length && !(s2[n3].ymin > i1); n3++)t4 = n3;
                    s2.splice(0, t4 + 1).forEach((t5)=>{
                        r2.push({
                            s: i1,
                            edge: t5
                        });
                    });
                }
                if (r2 = r2.filter((t4)=>!(t4.edge.ymax <= i1)
                ), r2.sort((t4, n3)=>t4.edge.x === n3.edge.x ? 0 : (t4.edge.x - n3.edge.x) / Math.abs(t4.edge.x - n3.edge.x)
                ), r2.length > 1) for(let t4; t4 < r2.length; t4 += 2){
                    const n3 = t4 + 1;
                    if (n3 >= r2.length) break;
                    const e3 = r2[t4].edge, s3 = r2[n3].edge;
                    o2.push([
                        [
                            Math.round(e3.x),
                            i1
                        ],
                        [
                            Math.round(s3.x),
                            i1
                        ]
                    ]);
                }
                i1 += t2, r2.forEach((n3)=>{
                    n3.edge.x = n3.edge.x + t2 * n3.edge.islope;
                });
            }
        }
        return o2;
    }(n1, e1);
    return s1 && (t2(n1, o1, -s1), (function(n2, e2, o2) {
        const s2 = [];
        n2.forEach((t1)=>s2.push(...t1)
        ), t2(s2, e2, o2);
    })(r1, o1, -s1)), r1;
}
class c extends class {
    constructor(t1){
        this.helper = t1;
    }
    fillPolygon(t, n) {
        return this._fillPolygon(t, n);
    }
    _fillPolygon(t, n, e = !1) {
        let o1 = a1(t, n);
        if (e) {
            const n2 = this.connectingLines(t, o1);
            o1 = o1.concat(n2);
        }
        return {
            type: "fillSketch",
            ops: this.renderLines(o1, n)
        };
    }
    renderLines(t, n) {
        const e2 = [];
        for (const o1 of t)e2.push(...this.helper.doubleLineOps(o1[0][0], o1[0][1], o1[1][0], o1[1][1], n));
        return e2;
    }
    connectingLines(t, e) {
        const o1 = [];
        if (e.length > 1) for(let s1; s1 < e.length; s1++){
            const r1 = e[s1 - 1];
            if (n1(r1) < 3) continue;
            const i1 = [
                e[s1][0],
                r1[1]
            ];
            if (n1(i1) > 3) {
                const n2 = this.splitOnIntersections(t, i1);
                o1.push(...n2);
            }
        }
        return o1;
    }
    midPointInPolygon(t, n) {
        return o1(t, (n[0][0] + n[1][0]) / 2, (n[0][1] + n[1][1]) / 2);
    }
    splitOnIntersections(t, s) {
        const r1 = Math.max(5, 0.1 * n1(s)), a1 = [];
        for(let o1 = 0; o1 < t.length; o1++){
            const c1 = t[o1], h = t[(o1 + 1) % t.length];
            if (i(c1, h, ...s)) {
                const t3 = e1(c1, h, s[0], s[1]);
                if (t3) {
                    const e2 = n1([
                        t3,
                        s[0]
                    ]), o2 = n1([
                        t3,
                        s[1]
                    ]);
                    e2 > r1 && o2 > r1 && a1.push({
                        point: t3,
                        distance: e2
                    });
                }
            }
        }
        if (a1.length > 1) {
            const n2 = a1.sort((t3, n3)=>t3.distance - n3.distance
            ).map((t3)=>t3.point
            );
            if (o1(t, ...s[0]) || n2.shift(), o1(t, ...s[1]) || n2.pop(), n2.length <= 1) return this.midPointInPolygon(t, s) ? [
                s
            ] : [];
            const e2 = [
                s[0],
                ...n2,
                s[1]
            ], r2 = [];
            for(let n3 = 0; n3 < e2.length - 1; n3 += 2){
                const o2 = [
                    e2[n3],
                    e2[n3 + 1]
                ];
                this.midPointInPolygon(t, o2) && r2.push(o2);
            }
            return r2;
        }
        return this.midPointInPolygon(t, s) ? [
            s
        ] : [];
    }
} {
    fillPolygon(t, n) {
        return this._fillPolygon(t, n, !0);
    }
}
class h2 {
    constructor(t3){
        this.seed = t3;
    }
    next() {
        return this.seed ? (2 ** 31 - 1 & (this.seed = Math.imul(48271, this.seed))) / 2 ** 31 : Math.random();
    }
}
function u2(t4, n2, e2, o1, s2) {
    return {
        type: "path",
        ops: M(t4, n2, e2, o1, s2)
    };
}
function l(t4, n2) {
    return (function(t5, n3, e2) {
        const o1 = (t5 || []).length;
        if (o1 > 2) {
            const s2 = [];
            for(let n4 = 0; n4 < o1 - 1; n4++)s2.push(...M(t5[n4][0], t5[n4][1], t5[n4 + 1][0], t5[n4 + 1][1], e2));
            return n3 && s2.push(...M(t5[o1 - 1][0], t5[o1 - 1][1], t5[0][0], t5[0][1], e2)), {
                type: "path",
                ops: s2
            };
        }
        return 2 === o1 ? u2(t5[0][0], t5[0][1], t5[1][0], t5[1][1], e2) : {
            type: "path",
            ops: []
        };
    })(t4, !0, n2);
}
function f(t4, n2, e2, o1, s2) {
    return (function(t5, n3, e3, o2) {
        const [s3, r1] = b(o2.increment, t5, n3, o2.rx, o2.ry, 1, o2.increment * g(0.1, g(0.4, 1, e3), e3), e3);
        let i1 = y(s3, null, e3);
        if (!e3.disableMultiStroke) {
            const [s4] = b(o2.increment, t5, n3, o2.rx, o2.ry, 1.5, 0, e3), r2 = y(s4, null, e3);
            i1 = i1.concat(r2);
        }
        return {
            estimatedPoints: r1,
            opset: {
                type: "path",
                ops: i1
            }
        };
    })(t4, n2, s2, p(e2, o1, s2)).opset;
}
function p(t4, n2, e2) {
    const o1 = Math.sqrt(2 * Math.PI * Math.sqrt((Math.pow(t4 / 2, 2) + Math.pow(n2 / 2, 2)) / 2)), s2 = Math.max(e2.curveStepCount, e2.curveStepCount / Math.sqrt(200) * o1), r1 = 2 * Math.PI / s2;
    let i1 = Math.abs(t4 / 2), a1 = Math.abs(n2 / 2);
    const c1 = 1 - e2.curveFitting;
    return i1 += m(i1 * c1, e2), a1 += m(a1 * c1, e2), {
        increment: r1,
        rx: i1,
        ry: a1
    };
}
function d(t4) {
    return t4.randomizer || (t4.randomizer = new h2(t4.seed || 0)), t4.randomizer.next();
}
function g(t4, n2, e2, o1 = 1) {
    return e2.roughness * o1 * (d(e2) * (n2 - t4) + t4);
}
function m(t4, n2, e2 = 1) {
    return g(-t4, t4, n2, e2);
}
function M(t4, n2, e2, o1, s2, r1 = !1) {
    const i1 = r1 ? s2.disableMultiStrokeFill : s2.disableMultiStroke, a1 = x(t4, n2, e2, o1, s2, !0, !1);
    if (i1) return a1;
    const c1 = x(t4, n2, e2, o1, s2, !0, !0);
    return a1.concat(c1);
}
function x(t4, n2, e2, o1, s2, r1, i1) {
    const a1 = Math.pow(t4 - e2, 2) + Math.pow(n2 - o1, 2), c1 = Math.sqrt(a1);
    let h1 = 1;
    h1 = c1 < 200 ? 1 : c1 > 500 ? 0.4 : -0.0016668 * c1 + 1.233334;
    let u1 = s2.maxRandomnessOffset || 0;
    u1 * u1 * 100 > a1 && (u1 = c1 / 10);
    const l1 = u1 / 2, f1 = 0.2 + 0.2 * d(s2);
    let p1 = s2.bowing * s2.maxRandomnessOffset * (o1 - n2) / 200, g1 = s2.bowing * s2.maxRandomnessOffset * (t4 - e2) / 200;
    p1 = m(p1, s2, h1), g1 = m(g1, s2, h1);
    const M1 = [], x1 = ()=>m(l1, s2, h1)
    , y = ()=>m(u1, s2, h1)
    ;
    return r1 && (i1 ? M1.push({
        op: "move",
        data: [
            t4 + x1(),
            n2 + x1()
        ]
    }) : M1.push({
        op: "move",
        data: [
            t4 + m(u1, s2, h1),
            n2 + m(u1, s2, h1)
        ]
    })), i1 ? M1.push({
        op: "bcurveTo",
        data: [
            p1 + t4 + (e2 - t4) * f1 + x1(),
            g1 + n2 + (o1 - n2) * f1 + x1(),
            p1 + t4 + 2 * (e2 - t4) * f1 + x1(),
            g1 + n2 + 2 * (o1 - n2) * f1 + x1(),
            e2 + x1(),
            o1 + x1()
        ]
    }) : M1.push({
        op: "bcurveTo",
        data: [
            p1 + t4 + (e2 - t4) * f1 + y(),
            g1 + n2 + (o1 - n2) * f1 + y(),
            p1 + t4 + 2 * (e2 - t4) * f1 + y(),
            g1 + n2 + 2 * (o1 - n2) * f1 + y(),
            e2 + y(),
            o1 + y()
        ]
    }), M1;
}
function y(t4, n2, e2) {
    const o1 = t4.length, s2 = [];
    if (o1 > 3) {
        const r1 = [], i1 = 1 - e2.curveTightness;
        s2.push({
            op: "move",
            data: [
                t4[1][0],
                t4[1][1]
            ]
        });
        for(let n3 = 1; n3 + 2 < o1; n3++){
            const e3 = t4[n3];
            r1[0] = [
                e3[0],
                e3[1]
            ], r1[1] = [
                e3[0] + (i1 * t4[n3 + 1][0] - i1 * t4[n3 - 1][0]) / 6,
                e3[1] + (i1 * t4[n3 + 1][1] - i1 * t4[n3 - 1][1]) / 6
            ], r1[2] = [
                t4[n3 + 1][0] + (i1 * t4[n3][0] - i1 * t4[n3 + 2][0]) / 6,
                t4[n3 + 1][1] + (i1 * t4[n3][1] - i1 * t4[n3 + 2][1]) / 6
            ], r1[3] = [
                t4[n3 + 1][0],
                t4[n3 + 1][1]
            ], s2.push({
                op: "bcurveTo",
                data: [
                    r1[1][0],
                    r1[1][1],
                    r1[2][0],
                    r1[2][1],
                    r1[3][0],
                    r1[3][1]
                ]
            });
        }
        if (n2 && 2 === n2.length) {
            const t5 = e2.maxRandomnessOffset;
            s2.push({
                op: "lineTo",
                data: [
                    n2[0] + m(t5, e2),
                    n2[1] + m(t5, e2)
                ]
            });
        }
    } else 3 === o1 ? (s2.push({
        op: "move",
        data: [
            t4[1][0],
            t4[1][1]
        ]
    }), s2.push({
        op: "bcurveTo",
        data: [
            t4[1][0],
            t4[1][1],
            t4[2][0],
            t4[2][1],
            t4[2][0],
            t4[2][1]
        ]
    })) : 2 === o1 && s2.push(...M(t4[0][0], t4[0][1], t4[1][0], t4[1][1], e2));
    return s2;
}
function b(t4, n2, e2, o1, s2, r1, i1, a1) {
    const c1 = [], h1 = [], u1 = m(0.5, a1) - Math.PI / 2;
    h1.push([
        m(r1, a1) + n2 + 0.9 * o1 * Math.cos(u1 - t4),
        m(r1, a1) + e2 + 0.9 * s2 * Math.sin(u1 - t4)
    ]);
    for(let i2 = u1; i2 < 2 * Math.PI + u1 - 0.01; i2 += t4){
        const t5 = [
            m(r1, a1) + n2 + o1 * Math.cos(i2),
            m(r1, a1) + e2 + s2 * Math.sin(i2)
        ];
        c1.push(t5), h1.push(t5);
    }
    return h1.push([
        m(r1, a1) + n2 + o1 * Math.cos(u1 + 2 * Math.PI + 0.5 * i1),
        m(r1, a1) + e2 + s2 * Math.sin(u1 + 2 * Math.PI + 0.5 * i1)
    ]), h1.push([
        m(r1, a1) + n2 + 0.98 * o1 * Math.cos(u1 + i1),
        m(r1, a1) + e2 + 0.98 * s2 * Math.sin(u1 + i1)
    ]), h1.push([
        m(r1, a1) + n2 + 0.9 * o1 * Math.cos(u1 + 0.5 * i1),
        m(r1, a1) + e2 + 0.9 * s2 * Math.sin(u1 + 0.5 * i1)
    ]), [
        h1,
        c1
    ];
}
const P1 = {
    randOffset: (t4, n2)=>t4
    ,
    randOffsetWithRange: (t4, n2, e2)=>(t4 + n2) / 2
    ,
    ellipse: (t4, n2, e2, o1, s2)=>f(t4, n2, e2, o1, s2)
    ,
    doubleLineOps: (t4, n2, e2, o1, s2)=>(function(t5, n3, e3, o2, s3) {
            return M(t5, n3, e3, o2, s3, !0);
        })(t4, n2, e2, o1, s2)
};
function v2(t4) {
    return {
        maxRandomnessOffset: 2,
        roughness: 1,
        bowing: 0.85,
        stroke: "#000",
        strokeWidth: 1.5,
        curveTightness: 0,
        curveFitting: 0.95,
        curveStepCount: 9,
        fillStyle: "hachure",
        fillWeight: 3.5,
        hachureAngle: -41,
        hachureGap: 5,
        dashOffset: -1,
        dashGap: -1,
        zigzagOffset: 0,
        combineNestedSvgPaths: !1,
        disableMultiStroke: !1,
        disableMultiStrokeFill: !1,
        seed: t4
    };
}
function w(t4, n2) {
    let e2 = "";
    for (const o1 of t4.ops){
        const t5 = o1.data;
        switch(o1.op){
            case "move":
                if (n2 && e2) break;
                e2 += `M${t5[0]} ${t5[1]} `;
                break;
            case "bcurveTo":
                e2 += `C${t5[0]} ${t5[1]}, ${t5[2]} ${t5[3]}, ${t5[4]} ${t5[5]} `;
                break;
            case "lineTo":
                e2 += `L${t5[0]} ${t5[1]} `;
        }
    }
    return e2.trim();
}
function I1(t4, n2) {
    const e2 = document.createElementNS("http://www.w3.org/2000/svg", t4);
    if (n2) for(const t5 in n2)e2.setAttributeNS(null, t5, n2[t5]);
    return e2;
}
function S(t4, n2, e2 = !1) {
    const o1 = I1("path", {
        d: w(t4, e2)
    });
    return n2 && n2.appendChild(o1), o1;
}
function k(t4, n2, e2, o1, s2, r1) {
    return S(function(t5, n3, e3, o2, s3) {
        return l([
            [
                t5,
                n3
            ],
            [
                t5 + e3,
                n3
            ],
            [
                t5 + e3,
                n3 + o2
            ],
            [
                t5,
                n3 + o2
            ]
        ], s3);
    }(n2 + 2, e2 + 2, o1 - 4, s2 - 4, v2(r1)), t4);
}
function O(t4, n2, e2, o1, s2, r1) {
    return S(u2(n2, e2, o1, s2, v2(r1)), t4);
}
function T1(t4, n2, e2) {
    return S(l(n2, v2(e2)), t4, !0);
}
function $1(t4, n2, e2, o1, s2, r1) {
    return S(f(n2, e2, o1 = Math.max(o1 > 10 ? o1 - 4 : o1 - 1, 1), s2 = Math.max(s2 > 10 ? s2 - 4 : s2 - 1, 1), v2(r1)), t4);
}
function E1(t4, n2) {
    return S(new c(P1).fillPolygon(t4, v2(n2)), null);
}
const line = O;
const isCEPolyfill = typeof window !== 'undefined' && window.customElements != null && window.customElements.polyfillWrapFlushCallback !== undefined;
const reparentNodes = (container, start, end = null, before = null)=>{
    while(start !== end){
        const n2 = start.nextSibling;
        container.insertBefore(start, before);
        start = n2;
    }
};
const removeNodes = (container, start, end = null)=>{
    while(start !== end){
        const n2 = start.nextSibling;
        container.removeChild(start);
        start = n2;
    }
};
const marker = `{{lit-${String(Math.random()).slice(2)}}}`;
const nodeMarker = `<!--${marker}-->`;
const markerRegex = new RegExp(`${marker}|${nodeMarker}`);
class Template {
    constructor(result, element5){
        this.parts = [];
        this.element = element5;
        const nodesToRemove = [];
        const stack = [];
        const walker = document.createTreeWalker(element5.content, 133, null, false);
        let lastPartIndex = 0;
        let index = -1;
        let partIndex = 0;
        const { strings: strings5 , values: { length  }  } = result;
        while(partIndex < length){
            const node = walker.nextNode();
            if (node === null) {
                walker.currentNode = stack.pop();
                continue;
            }
            index++;
            if (node.nodeType === 1) {
                if (node.hasAttributes()) {
                    const attributes = node.attributes;
                    const { length: length1  } = attributes;
                    let count = 0;
                    for(let i1 = 0; i1 < length1; i1++){
                        if (endsWith(attributes[i1].name, '$lit$')) {
                            count++;
                        }
                    }
                    while((count--) > 0){
                        const stringForPart = strings5[partIndex];
                        const name = /([ \x09\x0a\x0c\x0d])([^\0-\x1F\x7F-\x9F "'>=/]+)([ \x09\x0a\x0c\x0d]*=[ \x09\x0a\x0c\x0d]*(?:[^ \x09\x0a\x0c\x0d"'`<>=]*|"[^"]*|'[^']*))$/.exec(stringForPart)[2];
                        const attributeLookupName = name.toLowerCase() + '$lit$';
                        const attributeValue = node.getAttribute(attributeLookupName);
                        node.removeAttribute(attributeLookupName);
                        const statics = attributeValue.split(markerRegex);
                        this.parts.push({
                            type: 'attribute',
                            index,
                            name,
                            strings: statics
                        });
                        partIndex += statics.length - 1;
                    }
                }
                if (node.tagName === 'TEMPLATE') {
                    stack.push(node);
                    walker.currentNode = node.content;
                }
            } else if (node.nodeType === 3) {
                const data = node.data;
                if (data.indexOf(marker) >= 0) {
                    const parent = node.parentNode;
                    const strings1 = data.split(markerRegex);
                    const lastIndex = strings1.length - 1;
                    for(let i1 = 0; i1 < lastIndex; i1++){
                        let insert;
                        let s2 = strings1[i1];
                        if (s2 === '') {
                            insert = createMarker();
                        } else {
                            const match = /([ \x09\x0a\x0c\x0d])([^\0-\x1F\x7F-\x9F "'>=/]+)([ \x09\x0a\x0c\x0d]*=[ \x09\x0a\x0c\x0d]*(?:[^ \x09\x0a\x0c\x0d"'`<>=]*|"[^"]*|'[^']*))$/.exec(s2);
                            if (match !== null && endsWith(match[2], '$lit$')) {
                                s2 = s2.slice(0, match.index) + match[1] + match[2].slice(0, -'$lit$'.length) + match[3];
                            }
                            insert = document.createTextNode(s2);
                        }
                        parent.insertBefore(insert, node);
                        this.parts.push({
                            type: 'node',
                            index: ++index
                        });
                    }
                    if (strings1[lastIndex] === '') {
                        parent.insertBefore(createMarker(), node);
                        nodesToRemove.push(node);
                    } else {
                        node.data = strings1[lastIndex];
                    }
                    partIndex += lastIndex;
                }
            } else if (node.nodeType === 8) {
                if (node.data === marker) {
                    const parent = node.parentNode;
                    if (node.previousSibling === null || index === lastPartIndex) {
                        index++;
                        parent.insertBefore(createMarker(), node);
                    }
                    lastPartIndex = index;
                    this.parts.push({
                        type: 'node',
                        index
                    });
                    if (node.nextSibling === null) {
                        node.data = '';
                    } else {
                        nodesToRemove.push(node);
                        index--;
                    }
                    partIndex++;
                } else {
                    let i1 = -1;
                    while((i1 = node.data.indexOf(marker, i1 + 1)) !== -1){
                        this.parts.push({
                            type: 'node',
                            index: -1
                        });
                        partIndex++;
                    }
                }
            }
        }
        for (const n2 of nodesToRemove){
            n2.parentNode.removeChild(n2);
        }
    }
}
const endsWith = (str, suffix)=>{
    const index1 = str.length - suffix.length;
    return index1 >= 0 && str.slice(index1) === suffix;
};
const isTemplatePartActive = (part)=>part.index !== -1
;
const createMarker = ()=>document.createComment('')
;
function removeNodesFromTemplate(template, nodesToRemove1) {
    const { element: { content  } , parts  } = template;
    const walker1 = document.createTreeWalker(content, 133, null, false);
    let partIndex1 = nextActiveIndexInTemplateParts(parts);
    let part = parts[partIndex1];
    let nodeIndex = -1;
    let removeCount = 0;
    const nodesToRemoveInTemplate = [];
    let currentRemovingNode = null;
    while(walker1.nextNode()){
        nodeIndex++;
        const node = walker1.currentNode;
        if (node.previousSibling === currentRemovingNode) {
            currentRemovingNode = null;
        }
        if (nodesToRemove1.has(node)) {
            nodesToRemoveInTemplate.push(node);
            if (currentRemovingNode === null) {
                currentRemovingNode = node;
            }
        }
        if (currentRemovingNode !== null) {
            removeCount++;
        }
        while(part !== undefined && part.index === nodeIndex){
            part.index = currentRemovingNode !== null ? -1 : part.index - removeCount;
            partIndex1 = nextActiveIndexInTemplateParts(parts, partIndex1);
            part = parts[partIndex1];
        }
    }
    nodesToRemoveInTemplate.forEach((n3)=>n3.parentNode.removeChild(n3)
    );
}
const countNodes = (node)=>{
    let count = node.nodeType === 11 ? 0 : 1;
    const walker1 = document.createTreeWalker(node, 133, null, false);
    while(walker1.nextNode()){
        count++;
    }
    return count;
};
const nextActiveIndexInTemplateParts = (parts, startIndex = -1)=>{
    for(let i1 = startIndex + 1; i1 < parts.length; i1++){
        const part = parts[i1];
        if (isTemplatePartActive(part)) {
            return i1;
        }
    }
    return -1;
};
function insertNodeIntoTemplate(template, node, refNode = null) {
    const { element: { content  } , parts  } = template;
    if (refNode === null || refNode === undefined) {
        content.appendChild(node);
        return;
    }
    const walker1 = document.createTreeWalker(content, 133, null, false);
    let partIndex1 = nextActiveIndexInTemplateParts(parts);
    let insertCount = 0;
    let walkerIndex = -1;
    while(walker1.nextNode()){
        walkerIndex++;
        const walkerNode = walker1.currentNode;
        if (walkerNode === refNode) {
            insertCount = countNodes(node);
            refNode.parentNode.insertBefore(node, refNode);
        }
        while(partIndex1 !== -1 && parts[partIndex1].index === walkerIndex){
            if (insertCount > 0) {
                while(partIndex1 !== -1){
                    parts[partIndex1].index += insertCount;
                    partIndex1 = nextActiveIndexInTemplateParts(parts, partIndex1);
                }
                return;
            }
            partIndex1 = nextActiveIndexInTemplateParts(parts, partIndex1);
        }
    }
}
function templateFactory(result1) {
    let templateCache = templateCaches.get(result1.type);
    if (templateCache === undefined) {
        templateCache = {
            stringsArray: new WeakMap(),
            keyString: new Map()
        };
        templateCaches.set(result1.type, templateCache);
    }
    let template = templateCache.stringsArray.get(result1.strings);
    if (template !== undefined) {
        return template;
    }
    const key = result1.strings.join(marker);
    template = templateCache.keyString.get(key);
    if (template === undefined) {
        template = new Template(result1, result1.getTemplateElement());
        templateCache.keyString.set(key, template);
    }
    templateCache.stringsArray.set(result1.strings, template);
    return template;
}
const templateCaches = new Map();
const parts = new WeakMap();
const litRender = (result1, container, options)=>{
    let part = parts.get(container);
    if (part === undefined) {
        removeNodes(container, container.firstChild);
        parts.set(container, part = new NodePart(Object.assign({
            templateFactory: templateFactory
        }, options)));
        part.appendInto(container);
    }
    part.setValue(result1);
    part.commit();
};
class TemplateInstance {
    constructor(template, processor, options1){
        this.__parts = [];
        this.template = template;
        this.processor = processor;
        this.options = options1;
    }
    update(values) {
        let i1 = 0;
        for (const part of this.__parts){
            if (part !== undefined) {
                part.setValue(values[i1]);
            }
            i1++;
        }
        for (const part1 of this.__parts){
            if (part1 !== undefined) {
                part1.commit();
            }
        }
    }
    _clone() {
        const fragment = isCEPolyfill ? this.template.element.content.cloneNode(true) : document.importNode(this.template.element.content, true);
        const stack1 = [];
        const parts1 = this.template.parts;
        const walker1 = document.createTreeWalker(fragment, 133, null, false);
        let partIndex1 = 0;
        let nodeIndex = 0;
        let part;
        let node = walker1.nextNode();
        while(partIndex1 < parts1.length){
            part = parts1[partIndex1];
            if (!isTemplatePartActive(part)) {
                this.__parts.push(undefined);
                partIndex1++;
                continue;
            }
            while(nodeIndex < part.index){
                nodeIndex++;
                if (node.nodeName === 'TEMPLATE') {
                    stack1.push(node);
                    walker1.currentNode = node.content;
                }
                if ((node = walker1.nextNode()) === null) {
                    walker1.currentNode = stack1.pop();
                    node = walker1.nextNode();
                }
            }
            if (part.type === 'node') {
                const part1 = this.processor.handleTextExpression(this.options);
                part1.insertAfterNode(node.previousSibling);
                this.__parts.push(part1);
            } else {
                this.__parts.push(...this.processor.handleAttributeExpressions(node, part.name, part.strings, this.options));
            }
            partIndex1++;
        }
        if (isCEPolyfill) {
            document.adoptNode(fragment);
            customElements.upgrade(fragment);
        }
        return fragment;
    }
}
const getTemplateCacheKey = (type, scopeName)=>`${type}--${scopeName}`
;
let compatibleShadyCSSVersion = true;
if (typeof window.ShadyCSS === 'undefined') {
    compatibleShadyCSSVersion = false;
} else if (typeof window.ShadyCSS.prepareTemplateDom === 'undefined') {
    console.warn(`Incompatible ShadyCSS version detected. ` + `Please update to at least @webcomponents/webcomponentsjs@2.0.2 and ` + `@webcomponents/shadycss@1.3.1.`);
    compatibleShadyCSSVersion = false;
}
const shadyTemplateFactory = (scopeName)=>(result1)=>{
        const cacheKey = getTemplateCacheKey(result1.type, scopeName);
        let templateCache = templateCaches.get(cacheKey);
        if (templateCache === undefined) {
            templateCache = {
                stringsArray: new WeakMap(),
                keyString: new Map()
            };
            templateCaches.set(cacheKey, templateCache);
        }
        let template1 = templateCache.stringsArray.get(result1.strings);
        if (template1 !== undefined) {
            return template1;
        }
        const key = result1.strings.join(marker);
        template1 = templateCache.keyString.get(key);
        if (template1 === undefined) {
            const element1 = result1.getTemplateElement();
            if (compatibleShadyCSSVersion) {
                window.ShadyCSS.prepareTemplateDom(element1, scopeName);
            }
            template1 = new Template(result1, element1);
            templateCache.keyString.set(key, template1);
        }
        templateCache.stringsArray.set(result1.strings, template1);
        return template1;
    }
;
const TEMPLATE_TYPES = [
    'html',
    'svg'
];
const removeStylesFromLitTemplates = (scopeName)=>{
    TEMPLATE_TYPES.forEach((type)=>{
        const templates = templateCaches.get(getTemplateCacheKey(type, scopeName));
        if (templates !== undefined) {
            templates.keyString.forEach((template1)=>{
                const { element: { content  }  } = template1;
                const styles = new Set();
                Array.from(content.querySelectorAll('style')).forEach((s2)=>{
                    styles.add(s2);
                });
                removeNodesFromTemplate(template1, styles);
            });
        }
    });
};
const shadyRenderSet = new Set();
const prepareTemplateStyles = (scopeName, renderedDOM, template1)=>{
    shadyRenderSet.add(scopeName);
    const templateElement = !!template1 ? template1.element : document.createElement('template');
    const styles = renderedDOM.querySelectorAll('style');
    const { length: length1  } = styles;
    if (length1 === 0) {
        window.ShadyCSS.prepareTemplateStyles(templateElement, scopeName);
        return;
    }
    const condensedStyle = document.createElement('style');
    for(let i1 = 0; i1 < length1; i1++){
        const style = styles[i1];
        style.parentNode.removeChild(style);
        condensedStyle.textContent += style.textContent;
    }
    removeStylesFromLitTemplates(scopeName);
    const content = templateElement.content;
    if (!!template1) {
        insertNodeIntoTemplate(template1, condensedStyle, content.firstChild);
    } else {
        content.insertBefore(condensedStyle, content.firstChild);
    }
    window.ShadyCSS.prepareTemplateStyles(templateElement, scopeName);
    const style = content.querySelector('style');
    if (window.ShadyCSS.nativeShadow && style !== null) {
        renderedDOM.insertBefore(style.cloneNode(true), renderedDOM.firstChild);
    } else if (!!template1) {
        content.insertBefore(condensedStyle, content.firstChild);
        const removes = new Set();
        removes.add(condensedStyle);
        removeNodesFromTemplate(template1, removes);
    }
};
const render = (result1, container, options1)=>{
    if (!options1 || typeof options1 !== 'object' || !options1.scopeName) {
        throw new Error('The `scopeName` option is required.');
    }
    const scopeName = options1.scopeName;
    const hasRendered = parts.has(container);
    const needsScoping = compatibleShadyCSSVersion && container.nodeType === 11 && !!container.host;
    const firstScopeRender = needsScoping && !shadyRenderSet.has(scopeName);
    const renderContainer = firstScopeRender ? document.createDocumentFragment() : container;
    litRender(result1, renderContainer, Object.assign({
        templateFactory: shadyTemplateFactory(scopeName)
    }, options1));
    if (firstScopeRender) {
        const part = parts.get(renderContainer);
        parts.delete(renderContainer);
        const template1 = part.value instanceof TemplateInstance ? part.value.template : undefined;
        prepareTemplateStyles(scopeName, renderContainer, template1);
        removeNodes(container, container.firstChild);
        container.appendChild(renderContainer);
        parts.set(container, part);
    }
    if (!hasRendered && needsScoping) {
        window.ShadyCSS.styleElement(container.host);
    }
};
var _a;
window.JSCompiler_renameProperty = (prop, _obj)=>prop
;
const defaultConverter = {
    toAttribute (value, type) {
        switch(type){
            case Boolean:
                return value ? '' : null;
            case Object:
            case Array:
                return value == null ? value : JSON.stringify(value);
        }
        return value;
    },
    fromAttribute (value, type) {
        switch(type){
            case Boolean:
                return value !== null;
            case Number:
                return value === null ? null : Number(value);
            case Object:
            case Array:
                return JSON.parse(value);
        }
        return value;
    }
};
const notEqual = (value, old)=>{
    return old !== value && (old === old || value === value);
};
const defaultPropertyDeclaration = {
    attribute: true,
    type: String,
    converter: defaultConverter,
    reflect: false,
    hasChanged: notEqual
};
const STATE_UPDATE_REQUESTED = 1 << 2;
const STATE_IS_REFLECTING_TO_ATTRIBUTE = 1 << 3;
const STATE_IS_REFLECTING_TO_PROPERTY = 1 << 4;
const finalized = 'finalized';
class UpdatingElement extends HTMLElement {
    constructor(){
        super();
        this.initialize();
    }
    static get observedAttributes() {
        this.finalize();
        const attributes = [];
        this._classProperties.forEach((v1, p1)=>{
            const attr = this._attributeNameForProperty(p1, v1);
            if (attr !== undefined) {
                this._attributeToPropertyMap.set(attr, p1);
                attributes.push(attr);
            }
        });
        return attributes;
    }
    static _ensureClassProperties() {
        if (!this.hasOwnProperty(JSCompiler_renameProperty('_classProperties', this))) {
            this._classProperties = new Map();
            const superProperties = Object.getPrototypeOf(this)._classProperties;
            if (superProperties !== undefined) {
                superProperties.forEach((v1, k1)=>this._classProperties.set(k1, v1)
                );
            }
        }
    }
    static createProperty(name, options = defaultPropertyDeclaration) {
        this._ensureClassProperties();
        this._classProperties.set(name, options);
        if (options.noAccessor || this.prototype.hasOwnProperty(name)) {
            return;
        }
        const key = typeof name === 'symbol' ? Symbol() : `__${name}`;
        const descriptor = this.getPropertyDescriptor(name, key, options);
        if (descriptor !== undefined) {
            Object.defineProperty(this.prototype, name, descriptor);
        }
    }
    static getPropertyDescriptor(name, key, options) {
        return {
            get () {
                return this[key];
            },
            set (value) {
                const oldValue = this[name];
                this[key] = value;
                this.requestUpdateInternal(name, oldValue, options);
            },
            configurable: true,
            enumerable: true
        };
    }
    static getPropertyOptions(name) {
        return this._classProperties && this._classProperties.get(name) || defaultPropertyDeclaration;
    }
    static finalize() {
        const superCtor = Object.getPrototypeOf(this);
        if (!superCtor.hasOwnProperty('finalized')) {
            superCtor.finalize();
        }
        this[finalized] = true;
        this._ensureClassProperties();
        this._attributeToPropertyMap = new Map();
        if (this.hasOwnProperty(JSCompiler_renameProperty('properties', this))) {
            const props = this.properties;
            const propKeys = [
                ...Object.getOwnPropertyNames(props),
                ...typeof Object.getOwnPropertySymbols === 'function' ? Object.getOwnPropertySymbols(props) : []
            ];
            for (const p1 of propKeys){
                this.createProperty(p1, props[p1]);
            }
        }
    }
    static _attributeNameForProperty(name, options) {
        const attribute = options.attribute;
        return attribute === false ? undefined : typeof attribute === 'string' ? attribute : typeof name === 'string' ? name.toLowerCase() : undefined;
    }
    static _valueHasChanged(value, old, hasChanged = notEqual) {
        return hasChanged(value, old);
    }
    static _propertyValueFromAttribute(value, options) {
        const type = options.type;
        const converter = options.converter || defaultConverter;
        const fromAttribute = typeof converter === 'function' ? converter : converter.fromAttribute;
        return fromAttribute ? fromAttribute(value, type) : value;
    }
    static _propertyValueToAttribute(value, options) {
        if (options.reflect === undefined) {
            return;
        }
        const type = options.type;
        const converter = options.converter;
        const toAttribute = converter && converter.toAttribute || defaultConverter.toAttribute;
        return toAttribute(value, type);
    }
    initialize() {
        this._updateState = 0;
        this._updatePromise = new Promise((res)=>this._enableUpdatingResolver = res
        );
        this._changedProperties = new Map();
        this._saveInstanceProperties();
        this.requestUpdateInternal();
    }
    _saveInstanceProperties() {
        this.constructor._classProperties.forEach((_v, p1)=>{
            if (this.hasOwnProperty(p1)) {
                const value = this[p1];
                delete this[p1];
                if (!this._instanceProperties) {
                    this._instanceProperties = new Map();
                }
                this._instanceProperties.set(p1, value);
            }
        });
    }
    _applyInstanceProperties() {
        this._instanceProperties.forEach((v1, p1)=>this[p1] = v1
        );
        this._instanceProperties = undefined;
    }
    connectedCallback() {
        this.enableUpdating();
    }
    enableUpdating() {
        if (this._enableUpdatingResolver !== undefined) {
            this._enableUpdatingResolver();
            this._enableUpdatingResolver = undefined;
        }
    }
    disconnectedCallback() {
    }
    attributeChangedCallback(name, old, value) {
        if (old !== value) {
            this._attributeToProperty(name, value);
        }
    }
    _propertyToAttribute(name, value, options = defaultPropertyDeclaration) {
        const ctor = this.constructor;
        const attr = ctor._attributeNameForProperty(name, options);
        if (attr !== undefined) {
            const attrValue = ctor._propertyValueToAttribute(value, options);
            if (attrValue === undefined) {
                return;
            }
            this._updateState = this._updateState | STATE_IS_REFLECTING_TO_ATTRIBUTE;
            if (attrValue == null) {
                this.removeAttribute(attr);
            } else {
                this.setAttribute(attr, attrValue);
            }
            this._updateState = this._updateState & ~STATE_IS_REFLECTING_TO_ATTRIBUTE;
        }
    }
    _attributeToProperty(name, value) {
        if (this._updateState & STATE_IS_REFLECTING_TO_ATTRIBUTE) {
            return;
        }
        const ctor = this.constructor;
        const propName = ctor._attributeToPropertyMap.get(name);
        if (propName !== undefined) {
            const options2 = ctor.getPropertyOptions(propName);
            this._updateState = this._updateState | STATE_IS_REFLECTING_TO_PROPERTY;
            this[propName] = ctor._propertyValueFromAttribute(value, options2);
            this._updateState = this._updateState & ~STATE_IS_REFLECTING_TO_PROPERTY;
        }
    }
    requestUpdateInternal(name, oldValue, options) {
        let shouldRequestUpdate = true;
        if (name !== undefined) {
            const ctor = this.constructor;
            options = options || ctor.getPropertyOptions(name);
            if (ctor._valueHasChanged(this[name], oldValue, options.hasChanged)) {
                if (!this._changedProperties.has(name)) {
                    this._changedProperties.set(name, oldValue);
                }
                if (options.reflect === true && !(this._updateState & STATE_IS_REFLECTING_TO_PROPERTY)) {
                    if (this._reflectingProperties === undefined) {
                        this._reflectingProperties = new Map();
                    }
                    this._reflectingProperties.set(name, options);
                }
            } else {
                shouldRequestUpdate = false;
            }
        }
        if (!this._hasRequestedUpdate && shouldRequestUpdate) {
            this._updatePromise = this._enqueueUpdate();
        }
    }
    requestUpdate(name, oldValue) {
        this.requestUpdateInternal(name, oldValue);
        return this.updateComplete;
    }
    async _enqueueUpdate() {
        this._updateState = this._updateState | STATE_UPDATE_REQUESTED;
        try {
            await this._updatePromise;
        } catch (e) {
        }
        const result1 = this.performUpdate();
        if (result1 != null) {
            await result1;
        }
        return !this._hasRequestedUpdate;
    }
    get _hasRequestedUpdate() {
        return this._updateState & STATE_UPDATE_REQUESTED;
    }
    get hasUpdated() {
        return this._updateState & 1;
    }
    performUpdate() {
        if (!this._hasRequestedUpdate) {
            return;
        }
        if (this._instanceProperties) {
            this._applyInstanceProperties();
        }
        let shouldUpdate = false;
        const changedProperties = this._changedProperties;
        try {
            shouldUpdate = this.shouldUpdate(changedProperties);
            if (shouldUpdate) {
                this.update(changedProperties);
            } else {
                this._markUpdated();
            }
        } catch (e) {
            shouldUpdate = false;
            this._markUpdated();
            throw e;
        }
        if (shouldUpdate) {
            if (!(this._updateState & 1)) {
                this._updateState = this._updateState | 1;
                this.firstUpdated(changedProperties);
            }
            this.updated(changedProperties);
        }
    }
    _markUpdated() {
        this._changedProperties = new Map();
        this._updateState = this._updateState & ~STATE_UPDATE_REQUESTED;
    }
    get updateComplete() {
        return this._getUpdateComplete();
    }
    _getUpdateComplete() {
        return this._updatePromise;
    }
    shouldUpdate(_changedProperties) {
        return true;
    }
    update(_changedProperties) {
        if (this._reflectingProperties !== undefined && this._reflectingProperties.size > 0) {
            this._reflectingProperties.forEach((v1, k1)=>this._propertyToAttribute(k1, this[k1], v1)
            );
            this._reflectingProperties = undefined;
        }
        this._markUpdated();
    }
    updated(_changedProperties) {
    }
    firstUpdated(_changedProperties) {
    }
}
_a = 'finalized';
UpdatingElement[_a] = true;
const legacyCustomElement = (tagName, clazz)=>{
    window.customElements.define(tagName, clazz);
    return clazz;
};
const standardCustomElement = (tagName, descriptor)=>{
    const { kind , elements  } = descriptor;
    return {
        kind,
        elements,
        finisher (clazz) {
            window.customElements.define(tagName, clazz);
        }
    };
};
const customElement = (tagName)=>(classOrDescriptor)=>typeof classOrDescriptor === 'function' ? legacyCustomElement(tagName, classOrDescriptor) : standardCustomElement(tagName, classOrDescriptor)
;
const standardProperty = (options2, element1)=>{
    if (element1.kind === 'method' && element1.descriptor && !('value' in element1.descriptor)) {
        return Object.assign(Object.assign({
        }, element1), {
            finisher (clazz) {
                clazz.createProperty(element1.key, options2);
            }
        });
    } else {
        return {
            kind: 'field',
            key: Symbol(),
            placement: 'own',
            descriptor: {
            },
            initializer () {
                if (typeof element1.initializer === 'function') {
                    this[element1.key] = element1.initializer.call(this);
                }
            },
            finisher (clazz) {
                clazz.createProperty(element1.key, options2);
            }
        };
    }
};
const legacyProperty = (options2, proto, name)=>{
    proto.constructor.createProperty(name, options2);
};
function property(options2) {
    return (protoOrDescriptor, name)=>name !== undefined ? legacyProperty(options2, protoOrDescriptor, name) : standardProperty(options2, protoOrDescriptor)
    ;
}
function query(selector, cache) {
    return (protoOrDescriptor, name)=>{
        const descriptor = {
            get () {
                return this.renderRoot.querySelector(selector);
            },
            enumerable: true,
            configurable: true
        };
        if (cache) {
            const key = typeof name === 'symbol' ? Symbol() : `__${name}`;
            descriptor.get = function() {
                if (this[key] === undefined) {
                    this[key] = this.renderRoot.querySelector(selector);
                }
                return this[key];
            };
        }
        return name !== undefined ? legacyQuery(descriptor, protoOrDescriptor, name) : standardQuery(descriptor, protoOrDescriptor);
    };
}
const legacyQuery = (descriptor, proto, name)=>{
    Object.defineProperty(proto, name, descriptor);
};
const standardQuery = (descriptor, element1)=>({
        kind: 'method',
        placement: 'prototype',
        key: element1.key,
        descriptor
    })
;
const standardEventOptions = (options2, element1)=>{
    return Object.assign(Object.assign({
    }, element1), {
        finisher (clazz) {
            Object.assign(clazz.prototype[element1.key], options2);
        }
    });
};
const legacyEventOptions = (options2, proto, name)=>{
    Object.assign(proto[name], options2);
};
const ElementProto = Element.prototype;
const legacyMatches = ElementProto.msMatchesSelector || ElementProto.webkitMatchesSelector;
const policy = window.trustedTypes && trustedTypes.createPolicy('lit-html', {
    createHTML: (s2)=>s2
});
const commentMarker = ` ${marker} `;
class TemplateResult {
    constructor(strings1, values, type, processor1){
        this.strings = strings1;
        this.values = values;
        this.type = type;
        this.processor = processor1;
    }
    getHTML() {
        const l1 = this.strings.length - 1;
        let html = '';
        let isCommentBinding = false;
        for(let i1 = 0; i1 < l1; i1++){
            const s2 = this.strings[i1];
            const commentOpen = s2.lastIndexOf('<!--');
            isCommentBinding = (commentOpen > -1 || isCommentBinding) && s2.indexOf('-->', commentOpen + 1) === -1;
            const attributeMatch = /([ \x09\x0a\x0c\x0d])([^\0-\x1F\x7F-\x9F "'>=/]+)([ \x09\x0a\x0c\x0d]*=[ \x09\x0a\x0c\x0d]*(?:[^ \x09\x0a\x0c\x0d"'`<>=]*|"[^"]*|'[^']*))$/.exec(s2);
            if (attributeMatch === null) {
                html += s2 + (isCommentBinding ? commentMarker : nodeMarker);
            } else {
                html += s2.substr(0, attributeMatch.index) + attributeMatch[1] + attributeMatch[2] + '$lit$' + attributeMatch[3] + marker;
            }
        }
        html += this.strings[l1];
        return html;
    }
    getTemplateElement() {
        const template1 = document.createElement('template');
        let value = this.getHTML();
        if (policy !== undefined) {
            value = policy.createHTML(value);
        }
        template1.innerHTML = value;
        return template1;
    }
}
const isPrimitive = (value)=>{
    return value === null || !(typeof value === 'object' || typeof value === 'function');
};
const isIterable = (value)=>{
    return Array.isArray(value) || !!(value && value[Symbol.iterator]);
};
class AttributeCommitter {
    constructor(element1, name3, strings2){
        this.dirty = true;
        this.element = element1;
        this.name = name3;
        this.strings = strings2;
        this.parts = [];
        for(let i1 = 0; i1 < strings2.length - 1; i1++){
            this.parts[i1] = this._createPart();
        }
    }
    _createPart() {
        return new AttributePart(this);
    }
    _getValue() {
        const strings3 = this.strings;
        const l1 = strings3.length - 1;
        const parts1 = this.parts;
        if (l1 === 1 && strings3[0] === '' && strings3[1] === '') {
            const v1 = parts1[0].value;
            if (typeof v1 === 'symbol') {
                return String(v1);
            }
            if (typeof v1 === 'string' || !isIterable(v1)) {
                return v1;
            }
        }
        let text = '';
        for(let i2 = 0; i2 < l1; i2++){
            text += strings3[i2];
            const part = parts1[i2];
            if (part !== undefined) {
                const v1 = part.value;
                if (isPrimitive(v1) || !isIterable(v1)) {
                    text += typeof v1 === 'string' ? v1 : String(v1);
                } else {
                    for (const t4 of v1){
                        text += typeof t4 === 'string' ? t4 : String(t4);
                    }
                }
            }
        }
        text += strings3[l1];
        return text;
    }
    commit() {
        if (this.dirty) {
            this.dirty = false;
            this.element.setAttribute(this.name, this._getValue());
        }
    }
}
class AttributePart {
    constructor(committer){
        this.value = undefined;
        this.committer = committer;
    }
    setValue(value) {
        if (value !== noChange && (!isPrimitive(value) || value !== this.value)) {
            this.value = value;
            if (!isDirective(value)) {
                this.committer.dirty = true;
            }
        }
    }
    commit() {
        while(isDirective(this.value)){
            const directive = this.value;
            this.value = noChange;
            directive(this);
        }
        if (this.value === noChange) {
            return;
        }
        this.committer.commit();
    }
}
class NodePart {
    constructor(options2){
        this.value = undefined;
        this.__pendingValue = undefined;
        this.options = options2;
    }
    appendInto(container) {
        this.startNode = container.appendChild(createMarker());
        this.endNode = container.appendChild(createMarker());
    }
    insertAfterNode(ref) {
        this.startNode = ref;
        this.endNode = ref.nextSibling;
    }
    appendIntoPart(part) {
        part.__insert(this.startNode = createMarker());
        part.__insert(this.endNode = createMarker());
    }
    insertAfterPart(ref) {
        ref.__insert(this.startNode = createMarker());
        this.endNode = ref.endNode;
        ref.endNode = this.startNode;
    }
    setValue(value) {
        this.__pendingValue = value;
    }
    commit() {
        if (this.startNode.parentNode === null) {
            return;
        }
        while(isDirective(this.__pendingValue)){
            const directive = this.__pendingValue;
            this.__pendingValue = noChange;
            directive(this);
        }
        const value = this.__pendingValue;
        if (value === noChange) {
            return;
        }
        if (isPrimitive(value)) {
            if (value !== this.value) {
                this.__commitText(value);
            }
        } else if (value instanceof TemplateResult) {
            this.__commitTemplateResult(value);
        } else if (value instanceof Node) {
            this.__commitNode(value);
        } else if (isIterable(value)) {
            this.__commitIterable(value);
        } else if (value === nothing) {
            this.value = nothing;
            this.clear();
        } else {
            this.__commitText(value);
        }
    }
    __insert(node) {
        this.endNode.parentNode.insertBefore(node, this.endNode);
    }
    __commitNode(value) {
        if (this.value === value) {
            return;
        }
        this.clear();
        this.__insert(value);
        this.value = value;
    }
    __commitText(value) {
        const node = this.startNode.nextSibling;
        value = value == null ? '' : value;
        const valueAsString = typeof value === 'string' ? value : String(value);
        if (node === this.endNode.previousSibling && node.nodeType === 3) {
            node.data = valueAsString;
        } else {
            this.__commitNode(document.createTextNode(valueAsString));
        }
        this.value = value;
    }
    __commitTemplateResult(value) {
        const template1 = this.options.templateFactory(value);
        if (this.value instanceof TemplateInstance && this.value.template === template1) {
            this.value.update(value.values);
        } else {
            const instance = new TemplateInstance(template1, value.processor, this.options);
            const fragment = instance._clone();
            instance.update(value.values);
            this.__commitNode(fragment);
            this.value = instance;
        }
    }
    __commitIterable(value) {
        if (!Array.isArray(this.value)) {
            this.value = [];
            this.clear();
        }
        const itemParts = this.value;
        let partIndex1 = 0;
        let itemPart;
        for (const item of value){
            itemPart = itemParts[partIndex1];
            if (itemPart === undefined) {
                itemPart = new NodePart(this.options);
                itemParts.push(itemPart);
                if (partIndex1 === 0) {
                    itemPart.appendIntoPart(this);
                } else {
                    itemPart.insertAfterPart(itemParts[partIndex1 - 1]);
                }
            }
            itemPart.setValue(item);
            itemPart.commit();
            partIndex1++;
        }
        if (partIndex1 < itemParts.length) {
            itemParts.length = partIndex1;
            this.clear(itemPart && itemPart.endNode);
        }
    }
    clear(startNode = this.startNode) {
        removeNodes(this.startNode.parentNode, startNode.nextSibling, this.endNode);
    }
}
class BooleanAttributePart {
    constructor(element2, name1, strings3){
        this.value = undefined;
        this.__pendingValue = undefined;
        if (strings3.length !== 2 || strings3[0] !== '' || strings3[1] !== '') {
            throw new Error('Boolean attributes can only contain a single expression');
        }
        this.element = element2;
        this.name = name1;
        this.strings = strings3;
    }
    setValue(value) {
        this.__pendingValue = value;
    }
    commit() {
        while(isDirective(this.__pendingValue)){
            const directive = this.__pendingValue;
            this.__pendingValue = noChange;
            directive(this);
        }
        if (this.__pendingValue === noChange) {
            return;
        }
        const value = !!this.__pendingValue;
        if (this.value !== value) {
            if (value) {
                this.element.setAttribute(this.name, '');
            } else {
                this.element.removeAttribute(this.name);
            }
            this.value = value;
        }
        this.__pendingValue = noChange;
    }
}
class PropertyCommitter extends AttributeCommitter {
    constructor(element3, name2, strings4){
        super(element3, name2, strings4);
        this.single = strings4.length === 2 && strings4[0] === '' && strings4[1] === '';
    }
    _createPart() {
        return new PropertyPart(this);
    }
    _getValue() {
        if (this.single) {
            return this.parts[0].value;
        }
        return super._getValue();
    }
    commit() {
        if (this.dirty) {
            this.dirty = false;
            this.element[this.name] = this._getValue();
        }
    }
}
class PropertyPart extends AttributePart {
}
let eventOptionsSupported = false;
(()=>{
    try {
        const options3 = {
            get capture () {
                eventOptionsSupported = true;
                return false;
            }
        };
        window.addEventListener('test', options3, options3);
        window.removeEventListener('test', options3, options3);
    } catch (_e) {
    }
})();
class EventPart {
    constructor(element4, eventName, eventContext){
        this.value = undefined;
        this.__pendingValue = undefined;
        this.element = element4;
        this.eventName = eventName;
        this.eventContext = eventContext;
        this.__boundHandleEvent = (e2)=>this.handleEvent(e2)
        ;
    }
    setValue(value) {
        this.__pendingValue = value;
    }
    commit() {
        while(isDirective(this.__pendingValue)){
            const directive = this.__pendingValue;
            this.__pendingValue = noChange;
            directive(this);
        }
        if (this.__pendingValue === noChange) {
            return;
        }
        const newListener = this.__pendingValue;
        const oldListener = this.value;
        const shouldRemoveListener = newListener == null || oldListener != null && (newListener.capture !== oldListener.capture || newListener.once !== oldListener.once || newListener.passive !== oldListener.passive);
        const shouldAddListener = newListener != null && (oldListener == null || shouldRemoveListener);
        if (shouldRemoveListener) {
            this.element.removeEventListener(this.eventName, this.__boundHandleEvent, this.__options);
        }
        if (shouldAddListener) {
            this.__options = getOptions(newListener);
            this.element.addEventListener(this.eventName, this.__boundHandleEvent, this.__options);
        }
        this.value = newListener;
        this.__pendingValue = noChange;
    }
    handleEvent(event) {
        if (typeof this.value === 'function') {
            this.value.call(this.eventContext || this.element, event);
        } else {
            this.value.handleEvent(event);
        }
    }
}
const getOptions = (o1)=>o1 && (eventOptionsSupported ? {
        capture: o1.capture,
        passive: o1.passive,
        once: o1.once
    } : o1.capture)
;
class DefaultTemplateProcessor {
    handleAttributeExpressions(element, name, strings, options) {
        const prefix = name[0];
        if (prefix === '.') {
            const committer1 = new PropertyCommitter(element, name.slice(1), strings);
            return committer1.parts;
        }
        if (prefix === '@') {
            return [
                new EventPart(element, name.slice(1), options.eventContext)
            ];
        }
        if (prefix === '?') {
            return [
                new BooleanAttributePart(element, name.slice(1), strings)
            ];
        }
        const committer1 = new AttributeCommitter(element, name, strings);
        return committer1.parts;
    }
    handleTextExpression(options) {
        return new NodePart(options);
    }
}
const defaultTemplateProcessor = new DefaultTemplateProcessor();
const directives = new WeakMap();
const isDirective = (o1)=>{
    return typeof o1 === 'function' && directives.has(o1);
};
const noChange = {
};
const nothing = {
};
if (typeof window !== 'undefined') {
    (window['litHtmlVersions'] || (window['litHtmlVersions'] = [])).push('1.3.0');
}
const html = (strings6, ...values1)=>new TemplateResult(strings6, values1, 'html', defaultTemplateProcessor)
;
const html1 = html;
const supportsAdoptingStyleSheets = window.ShadowRoot && (window.ShadyCSS === undefined || window.ShadyCSS.nativeShadow) && 'adoptedStyleSheets' in Document.prototype && 'replace' in CSSStyleSheet.prototype;
const constructionToken = Symbol();
class CSSResult {
    constructor(cssText, safeToken){
        if (safeToken !== constructionToken) {
            throw new Error('CSSResult is not constructable. Use `unsafeCSS` or `css` instead.');
        }
        this.cssText = cssText;
    }
    get styleSheet() {
        if (this._styleSheet === undefined) {
            if (supportsAdoptingStyleSheets) {
                this._styleSheet = new CSSStyleSheet();
                this._styleSheet.replaceSync(this.cssText);
            } else {
                this._styleSheet = null;
            }
        }
        return this._styleSheet;
    }
    toString() {
        return this.cssText;
    }
}
const unsafeCSS = (value)=>{
    return new CSSResult(String(value), constructionToken);
};
const textFromCSSResult = (value)=>{
    if (value instanceof CSSResult) {
        return value.cssText;
    } else if (typeof value === 'number') {
        return value;
    } else {
        throw new Error(`Value passed to 'css' function must be a 'css' function result: ${value}. Use 'unsafeCSS' to pass non-literal values, but\n            take care to ensure page security.`);
    }
};
const css = (strings6, ...values1)=>{
    const cssText1 = values1.reduce((acc, v1, idx)=>acc + textFromCSSResult(v1) + strings6[idx + 1]
    , strings6[0]);
    return new CSSResult(cssText1, constructionToken);
};
(window['litElementVersions'] || (window['litElementVersions'] = [])).push('2.4.0');
const renderNotImplemented = {
};
class LitElement extends UpdatingElement {
    static getStyles() {
        return this.styles;
    }
    static _getUniqueStyles() {
        if (this.hasOwnProperty(JSCompiler_renameProperty('_styles', this))) {
            return;
        }
        const userStyles = this.getStyles();
        if (Array.isArray(userStyles)) {
            const addStyles = (styles, set)=>styles.reduceRight((set1, s2)=>Array.isArray(s2) ? addStyles(s2, set1) : (set1.add(s2), set1)
                , set)
            ;
            const set = addStyles(userStyles, new Set());
            const styles = [];
            set.forEach((v1)=>styles.unshift(v1)
            );
            this._styles = styles;
        } else {
            this._styles = userStyles === undefined ? [] : [
                userStyles
            ];
        }
        this._styles = this._styles.map((s2)=>{
            if (s2 instanceof CSSStyleSheet && !supportsAdoptingStyleSheets) {
                const cssText1 = Array.prototype.slice.call(s2.cssRules).reduce((css1, rule)=>css1 + rule.cssText
                , '');
                return unsafeCSS(cssText1);
            }
            return s2;
        });
    }
    initialize() {
        super.initialize();
        this.constructor._getUniqueStyles();
        this.renderRoot = this.createRenderRoot();
        if (window.ShadowRoot && this.renderRoot instanceof window.ShadowRoot) {
            this.adoptStyles();
        }
    }
    createRenderRoot() {
        return this.attachShadow({
            mode: 'open'
        });
    }
    adoptStyles() {
        const styles = this.constructor._styles;
        if (styles.length === 0) {
            return;
        }
        if (window.ShadyCSS !== undefined && !window.ShadyCSS.nativeShadow) {
            window.ShadyCSS.ScopingShim.prepareAdoptedCssText(styles.map((s2)=>s2.cssText
            ), this.localName);
        } else if (supportsAdoptingStyleSheets) {
            this.renderRoot.adoptedStyleSheets = styles.map((s2)=>s2 instanceof CSSStyleSheet ? s2 : s2.styleSheet
            );
        } else {
            this._needsShimAdoptedStyleSheets = true;
        }
    }
    connectedCallback() {
        super.connectedCallback();
        if (this.hasUpdated && window.ShadyCSS !== undefined) {
            window.ShadyCSS.styleElement(this);
        }
    }
    update(changedProperties) {
        const templateResult = this.render();
        super.update(changedProperties);
        if (templateResult !== renderNotImplemented) {
            this.constructor.render(templateResult, this.renderRoot, {
                scopeName: this.localName,
                eventContext: this
            });
        }
        if (this._needsShimAdoptedStyleSheets) {
            this._needsShimAdoptedStyleSheets = false;
            this.constructor._styles.forEach((s2)=>{
                const style = document.createElement('style');
                style.textContent = s2.cssText;
                this.renderRoot.appendChild(style);
            });
        }
    }
    render() {
        return renderNotImplemented;
    }
}
LitElement['finalized'] = true;
LitElement.render = render;
const css1 = css;
var __decorate = this && this.__decorate || function(decorators, target, key, desc) {
    var c1 = arguments.length, r1 = c1 < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d1;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r1 = Reflect.decorate(decorators, target, key, desc);
    else for(var i2 = decorators.length - 1; i2 >= 0; i2--)if (d1 = decorators[i2]) r1 = (c1 < 3 ? d1(r1) : c1 > 3 ? d1(target, key, r1) : d1(target, key)) || r1;
    return (c1 > 3 && r1 && Object.defineProperty(target, key, r1), r1);
};
var __metadata = this && this.__metadata || function(k1, v1) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k1, v1);
};
const BaseCSS = css`\n:host {\n  opacity: 0;\n}\n:host(.wired-rendered) {\n  opacity: 1;\n}\n#overlay {\n  position: absolute;\n  top: 0;\n  left: 0;\n  right: 0;\n  bottom: 0;\n  pointer-events: none;\n}\nsvg {\n  display: block;\n}\npath {\n  stroke: currentColor;\n  stroke-width: 0.7;\n  fill: transparent;\n}\n.hidden {\n  display: none !important;\n}\n`;
class WiredBase extends LitElement {
    constructor(){
        super(...arguments);
        this.lastSize = [
            0,
            0
        ];
        this.seed = Math.floor(Math.random() * 2 ** 31);
    }
    updated(_changed) {
        this.wiredRender();
    }
    wiredRender(force = false) {
        if (this.svg) {
            const size = this.canvasSize();
            if (!force && size[0] === this.lastSize[0] && size[1] === this.lastSize[1]) {
                return;
            }
            while(this.svg.hasChildNodes()){
                this.svg.removeChild(this.svg.lastChild);
            }
            this.svg.setAttribute('width', `${size[0]}`);
            this.svg.setAttribute('height', `${size[1]}`);
            this.draw(this.svg, size);
            this.lastSize = size;
            this.classList.add('wired-rendered');
        }
    }
}
__decorate([
    query('svg'),
    __metadata("design:type", SVGSVGElement)
], WiredBase.prototype, "svg", void 0);
function fire(element6, name4, detail, bubbles = true, composed = true) {
    if (name4) {
        const init = {
            bubbles: typeof bubbles === 'boolean' ? bubbles : true,
            composed: typeof composed === 'boolean' ? composed : true
        };
        if (detail) {
            init.detail = detail;
        }
        element6.dispatchEvent(new CustomEvent(name4, init));
    }
}
function randomSeed() {
    return Math.floor(Math.random() * 2 ** 31);
}
class Port {
    constructor(device){
        this.device_ = device;
        this.interfaceNumber = 0;
        this.endpointIn = 0;
        this.endpointOut = 0;
    }
    disconnect() {
        return this.device_.controlTransferOut({
            'requestType': 'class',
            'recipient': 'interface',
            'request': 34,
            'value': 0,
            'index': this.interfaceNumber
        }).then(()=>this.device_.close()
        );
    }
    send(data) {
        console.log('sending', data, this.device_, this.endpointOut);
        return this.device_.transferOut(this.endpointOut, data);
    }
    connect() {
        let readLoop = ()=>{
            this.device_.transferIn(this.endpointIn, 64).then((result1)=>{
                this.onReceive(result1.data);
                readLoop();
            }, (error)=>{
                this.onReceiveError(error);
            });
        };
        return this.device_.open().then(()=>this.device_.configuration || this.device_.selectConfiguration(1)
        ).then(()=>{
            var interfaces = this.device_.configuration.interfaces;
            interfaces.forEach((element6)=>{
                element6.alternates.forEach((elementalt)=>{
                    if (elementalt.interfaceClass == 255) {
                        this.interfaceNumber = element6.interfaceNumber;
                        elementalt.endpoints.forEach((ee)=>{
                            if (ee.direction == "out") this.endpointOut = ee.endpointNumber;
                            if (ee.direction == "in") this.endpointIn = ee.endpointNumber;
                        });
                    }
                });
            });
        }).then(()=>this.device_.claimInterface(this.interfaceNumber)
        ).then(()=>this.device_.selectAlternateInterface(this.interfaceNumber, 0)
        ).then(()=>this.device_.controlTransferOut({
                requestType: 'class',
                recipient: 'interface',
                request: 34,
                value: 1,
                index: this.interfaceNumber
            })
        ).then(readLoop);
    }
}
function t4(t5, e2, s2) {
    if (t5 && t5.length) {
        const [n3, o1] = e2, a1 = Math.PI / 180 * s2, r1 = Math.cos(a1), h1 = Math.sin(a1);
        t5.forEach((t6)=>{
            const [e3, s3] = t6;
            t6[0] = (e3 - n3) * r1 - (s3 - o1) * h1 + n3, t6[1] = (e3 - n3) * h1 + (s3 - o1) * r1 + o1;
        });
    }
}
function e2(t5) {
    const e3 = t5[0], s2 = t5[1];
    return Math.sqrt(Math.pow(e3[0] - s2[0], 2) + Math.pow(e3[1] - s2[1], 2));
}
function s2(t5, e3, s3, n3) {
    const o1 = e3[1] - t5[1], a1 = t5[0] - e3[0], r1 = o1 * t5[0] + a1 * t5[1], h1 = n3[1] - s3[1], i2 = s3[0] - n3[0], c1 = h1 * s3[0] + i2 * s3[1], l1 = o1 * i2 - h1 * a1;
    return l1 ? [
        (i2 * r1 - a1 * c1) / l1,
        (o1 * c1 - h1 * r1) / l1
    ] : null;
}
function n3(t5, e3, s3) {
    const n4 = t5.length;
    if (n4 < 3) return !1;
    const h1 = [
        Number.MAX_SAFE_INTEGER,
        s3
    ], i2 = [
        e3,
        s3
    ];
    let c1 = 0;
    for(let e4 = 0; e4 < n4; e4++){
        const s4 = t5[e4], l1 = t5[(e4 + 1) % n4];
        if (r2(s4, l1, i2, h1)) {
            if (0 === a2(s4, i2, l1)) return o2(s4, i2, l1);
            c1++;
        }
    }
    return c1 % 2 == 1;
}
function o2(t5, e3, s3) {
    return e3[0] <= Math.max(t5[0], s3[0]) && e3[0] >= Math.min(t5[0], s3[0]) && e3[1] <= Math.max(t5[1], s3[1]) && e3[1] >= Math.min(t5[1], s3[1]);
}
function a2(t5, e3, s3) {
    const n4 = (e3[1] - t5[1]) * (s3[0] - e3[0]) - (e3[0] - t5[0]) * (s3[1] - e3[1]);
    return 0 === n4 ? 0 : n4 > 0 ? 1 : 2;
}
function r2(t5, e3, s3, n4) {
    const r3 = a2(t5, e3, s3), h1 = a2(t5, e3, n4), i2 = a2(s3, n4, t5), c1 = a2(s3, n4, e3);
    return r3 !== h1 && i2 !== c1 || !(0 !== r3 || !o2(t5, s3, e3)) || !(0 !== h1 || !o2(t5, n4, e3)) || !(0 !== i2 || !o2(s3, t5, n4)) || !(0 !== c1 || !o2(s3, e3, n4));
}
function h1(e3, s3) {
    const n4 = [
        0,
        0
    ], o3 = Math.round(s3.hachureAngle + 90);
    o3 && t4(e3, n4, o3);
    const a3 = function(t5, e4) {
        const s4 = [
            ...t5
        ];
        s4[0].join(",") !== s4[s4.length - 1].join(",") && s4.push([
            s4[0][0],
            s4[0][1]
        ]);
        const n5 = [];
        if (s4 && s4.length > 2) {
            let t6 = e4.hachureGap;
            t6 < 0 && (t6 = 4 * e4.strokeWidth), t6 = Math.max(t6, 0.1);
            const o4 = [];
            for(let t7 = 0; t7 < s4.length - 1; t7++){
                const e5 = s4[t7], n6 = s4[t7 + 1];
                if (e5[1] !== n6[1]) {
                    const t8 = Math.min(e5[1], n6[1]);
                    o4.push({
                        ymin: t8,
                        ymax: Math.max(e5[1], n6[1]),
                        x: t8 === e5[1] ? e5[0] : n6[0],
                        islope: (n6[0] - e5[0]) / (n6[1] - e5[1])
                    });
                }
            }
            if (o4.sort((t8, e5)=>t8.ymin < e5.ymin ? -1 : t8.ymin > e5.ymin ? 1 : t8.x < e5.x ? -1 : t8.x > e5.x ? 1 : t8.ymax === e5.ymax ? 0 : (t8.ymax - e5.ymax) / Math.abs(t8.ymax - e5.ymax)
            ), !o4.length) return n5;
            let a4 = [], r3 = o4[0].ymin;
            for(; a4.length || o4.length;){
                if (o4.length) {
                    let t8 = -1;
                    for(let e5 = 0; e5 < o4.length && !(o4[e5].ymin > r3); e5++)t8 = e5;
                    o4.splice(0, t8 + 1).forEach((t9)=>{
                        a4.push({
                            s: r3,
                            edge: t9
                        });
                    });
                }
                if (a4 = a4.filter((t8)=>!(t8.edge.ymax <= r3)
                ), a4.sort((t8, e5)=>t8.edge.x === e5.edge.x ? 0 : (t8.edge.x - e5.edge.x) / Math.abs(t8.edge.x - e5.edge.x)
                ), a4.length > 1) for(let t8; t8 < a4.length; t8 += 2){
                    const e5 = t8 + 1;
                    if (e5 >= a4.length) break;
                    const s5 = a4[t8].edge, o5 = a4[e5].edge;
                    n5.push([
                        [
                            Math.round(s5.x),
                            r3
                        ],
                        [
                            Math.round(o5.x),
                            r3
                        ]
                    ]);
                }
                r3 += t6, a4.forEach((e5)=>{
                    e5.edge.x = e5.edge.x + t6 * e5.edge.islope;
                });
            }
        }
        return n5;
    }(e3, s3);
    return o3 && (t4(e3, n4, -o3), (function(e4, s4, n5) {
        const o4 = [];
        e4.forEach((t5)=>o4.push(...t5)
        ), t4(o4, s4, n5);
    })(a3, n4, -o3)), a3;
}
class i2 {
    constructor(t5){
        this.helper = t5;
    }
    fillPolygon(t, e) {
        return this._fillPolygon(t, e);
    }
    _fillPolygon(t, e, s = !1) {
        let n4 = h1(t, e);
        if (s) {
            const e3 = this.connectingLines(t, n4);
            n4 = n4.concat(e3);
        }
        return {
            type: "fillSketch",
            ops: this.renderLines(n4, e)
        };
    }
    renderLines(t, e) {
        const s3 = [];
        for (const n4 of t)s3.push(...this.helper.doubleLineOps(n4[0][0], n4[0][1], n4[1][0], n4[1][1], e));
        return s3;
    }
    connectingLines(t, s) {
        const n4 = [];
        if (s.length > 1) for(let o3; o3 < s.length; o3++){
            const a3 = s[o3 - 1];
            if (e2(a3) < 3) continue;
            const r3 = [
                s[o3][0],
                a3[1]
            ];
            if (e2(r3) > 3) {
                const e3 = this.splitOnIntersections(t, r3);
                n4.push(...e3);
            }
        }
        return n4;
    }
    midPointInPolygon(t, e) {
        return n3(t, (e[0][0] + e[1][0]) / 2, (e[0][1] + e[1][1]) / 2);
    }
    splitOnIntersections(t, o) {
        const a3 = Math.max(5, 0.1 * e2(o)), h2 = [];
        for(let n4 = 0; n4 < t.length; n4++){
            const i3 = t[n4], c1 = t[(n4 + 1) % t.length];
            if (r2(i3, c1, ...o)) {
                const t6 = s2(i3, c1, o[0], o[1]);
                if (t6) {
                    const s3 = e2([
                        t6,
                        o[0]
                    ]), n5 = e2([
                        t6,
                        o[1]
                    ]);
                    s3 > a3 && n5 > a3 && h2.push({
                        point: t6,
                        distance: s3
                    });
                }
            }
        }
        if (h2.length > 1) {
            const e3 = h2.sort((t6, e4)=>t6.distance - e4.distance
            ).map((t6)=>t6.point
            );
            if (n3(t, ...o[0]) || e3.shift(), n3(t, ...o[1]) || e3.pop(), e3.length <= 1) return this.midPointInPolygon(t, o) ? [
                o
            ] : [];
            const s3 = [
                o[0],
                ...e3,
                o[1]
            ], a4 = [];
            for(let e4 = 0; e4 < s3.length - 1; e4 += 2){
                const n5 = [
                    s3[e4],
                    s3[e4 + 1]
                ];
                this.midPointInPolygon(t, n5) && a4.push(n5);
            }
            return a4;
        }
        return this.midPointInPolygon(t, o) ? [
            o
        ] : [];
    }
}
class c1 extends i2 {
    fillPolygon(t, e) {
        return this._fillPolygon(t, e, !0);
    }
}
class l1 extends i2 {
    fillPolygon(t, e) {
        const s3 = this._fillPolygon(t, e), n4 = Object.assign({
        }, e, {
            hachureAngle: e.hachureAngle + 90
        }), o3 = this._fillPolygon(t, n4);
        return s3.ops = s3.ops.concat(o3.ops), s3;
    }
}
class u1 {
    constructor(t6){
        this.helper = t6;
    }
    fillPolygon(t, e) {
        const s3 = h1(t, e = Object.assign({
        }, e, {
            curveStepCount: 4,
            hachureAngle: 0,
            roughness: 1
        }));
        return this.dotsOnLines(s3, e);
    }
    dotsOnLines(t, s) {
        const n4 = [];
        let o3 = s.hachureGap;
        o3 < 0 && (o3 = 4 * s.strokeWidth), o3 = Math.max(o3, 0.1);
        let a3 = s.fillWeight;
        a3 < 0 && (a3 = s.strokeWidth / 2);
        const r3 = o3 / 4;
        for (const h2 of t){
            const t7 = e2(h2), i3 = t7 / o3, c2 = Math.ceil(i3) - 1, l2 = t7 - c2 * o3, u2 = (h2[0][0] + h2[1][0]) / 2 - o3 / 4, f1 = Math.min(h2[0][1], h2[1][1]);
            for(let t8 = 0; t8 < c2; t8++){
                const e3 = f1 + l2 + t8 * o3, h3 = this.helper.randOffsetWithRange(u2 - r3, u2 + r3, s), i4 = this.helper.randOffsetWithRange(e3 - r3, e3 + r3, s), c3 = this.helper.ellipse(h3, i4, a3, a3, s);
                n4.push(...c3.ops);
            }
        }
        return {
            type: "fillSketch",
            ops: n4
        };
    }
}
class f1 {
    constructor(t7){
        this.helper = t7;
    }
    fillPolygon(t, e) {
        const s3 = h1(t, e);
        return {
            type: "fillSketch",
            ops: this.dashedLine(s3, e)
        };
    }
    dashedLine(t, s) {
        const n4 = s.dashOffset < 0 ? s.hachureGap < 0 ? 4 * s.strokeWidth : s.hachureGap : s.dashOffset, o3 = s.dashGap < 0 ? s.hachureGap < 0 ? 4 * s.strokeWidth : s.hachureGap : s.dashGap, a3 = [];
        return t.forEach((t8)=>{
            const r3 = e2(t8), h2 = Math.floor(r3 / (n4 + o3)), i3 = (r3 + o3 - h2 * (n4 + o3)) / 2;
            let c2 = t8[0], l2 = t8[1];
            c2[0] > l2[0] && (c2 = t8[1], l2 = t8[0]);
            const u2 = Math.atan((l2[1] - c2[1]) / (l2[0] - c2[0]));
            for(let t9 = 0; t9 < h2; t9++){
                const e3 = t9 * (n4 + o3), r4 = e3 + n4, h3 = [
                    c2[0] + e3 * Math.cos(u2) + i3 * Math.cos(u2),
                    c2[1] + e3 * Math.sin(u2) + i3 * Math.sin(u2)
                ], l3 = [
                    c2[0] + r4 * Math.cos(u2) + i3 * Math.cos(u2),
                    c2[1] + r4 * Math.sin(u2) + i3 * Math.sin(u2)
                ];
                a3.push(...this.helper.doubleLineOps(h3[0], h3[1], l3[0], l3[1], s));
            }
        }), a3;
    }
}
class p1 {
    constructor(t8){
        this.helper = t8;
    }
    fillPolygon(t, e) {
        const s3 = e.hachureGap < 0 ? 4 * e.strokeWidth : e.hachureGap, n4 = e.zigzagOffset < 0 ? s3 : e.zigzagOffset, o3 = h1(t, e = Object.assign({
        }, e, {
            hachureGap: s3 + n4
        }));
        return {
            type: "fillSketch",
            ops: this.zigzagLines(o3, n4, e)
        };
    }
    zigzagLines(t, s, n) {
        const o3 = [];
        return t.forEach((t9)=>{
            const a3 = e2(t9), r3 = Math.round(a3 / (2 * s));
            let h2 = t9[0], i3 = t9[1];
            h2[0] > i3[0] && (h2 = t9[1], i3 = t9[0]);
            const c2 = Math.atan((i3[1] - h2[1]) / (i3[0] - h2[0]));
            for(let t10 = 0; t10 < r3; t10++){
                const e3 = 2 * t10 * s, a4 = 2 * (t10 + 1) * s, r4 = Math.sqrt(2 * Math.pow(s, 2)), i4 = [
                    h2[0] + e3 * Math.cos(c2),
                    h2[1] + e3 * Math.sin(c2)
                ], l2 = [
                    h2[0] + a4 * Math.cos(c2),
                    h2[1] + a4 * Math.sin(c2)
                ], u2 = [
                    i4[0] + r4 * Math.cos(c2 + Math.PI / 4),
                    i4[1] + r4 * Math.sin(c2 + Math.PI / 4)
                ];
                o3.push(...this.helper.doubleLineOps(i4[0], i4[1], u2[0], u2[1], n), ...this.helper.doubleLineOps(u2[0], u2[1], l2[0], l2[1], n));
            }
        }), o3;
    }
}
const d1 = {
};
class g1 {
    constructor(t9){
        this.seed = t9;
    }
    next() {
        return this.seed ? (2 ** 31 - 1 & (this.seed = Math.imul(48271, this.seed))) / 2 ** 31 : Math.random();
    }
}
const M1 = {
    A: 7,
    a: 7,
    C: 6,
    c: 6,
    H: 1,
    h: 1,
    L: 2,
    l: 2,
    M: 2,
    m: 2,
    Q: 4,
    q: 4,
    S: 4,
    s: 4,
    T: 2,
    t: 2,
    V: 1,
    v: 1,
    Z: 0,
    z: 0
};
function k1(t10, e3) {
    return t10.type === e3;
}
function b1(t10) {
    const e3 = [], s3 = function(t11) {
        const e4 = new Array();
        for(; "" !== t11;)if (t11.match(/^([ \t\r\n,]+)/)) t11 = t11.substr(RegExp.$1.length);
        else if (t11.match(/^([aAcChHlLmMqQsStTvVzZ])/)) e4[e4.length] = {
            type: 0,
            text: RegExp.$1
        }, t11 = t11.substr(RegExp.$1.length);
        else {
            if (!t11.match(/^(([-+]?[0-9]+(\.[0-9]*)?|[-+]?\.[0-9]+)([eE][-+]?[0-9]+)?)/)) return [];
            e4[e4.length] = {
                type: 1,
                text: "" + parseFloat(RegExp.$1)
            }, t11 = t11.substr(RegExp.$1.length);
        }
        return e4[e4.length] = {
            type: 2,
            text: ""
        }, e4;
    }(t10);
    let n4 = "BOD", o3 = 0, a3 = s3[o3];
    for(; !k1(a3, 2);){
        let r3 = 0;
        const h2 = [];
        if ("BOD" === n4) {
            if ("M" !== a3.text && "m" !== a3.text) return b1("M0,0" + t10);
            o3++, r3 = M1[a3.text], n4 = a3.text;
        } else k1(a3, 1) ? r3 = M1[n4] : (o3++, r3 = M1[a3.text], n4 = a3.text);
        if (!(o3 + r3 < s3.length)) throw new Error("Path data ended short");
        for(let t11 = o3; t11 < o3 + r3; t11++){
            const e4 = s3[t11];
            if (!k1(e4, 1)) throw new Error("Param not a number: " + n4 + "," + e4.text);
            h2[h2.length] = +e4.text;
        }
        if ("number" != typeof M1[n4]) throw new Error("Bad segment: " + n4);
        {
            const t12 = {
                key: n4,
                data: h2
            };
            e3.push(t12), o3 += r3, a3 = s3[o3], "M" === n4 && (n4 = "L"), "m" === n4 && (n4 = "l");
        }
    }
    return e3;
}
function y1(t10) {
    let e3 = 0, s3 = 0, n4 = 0, o3 = 0;
    const a3 = [];
    for (const { key: r3 , data: h2  } of t10)switch(r3){
        case "M":
            a3.push({
                key: "M",
                data: [
                    ...h2
                ]
            }), [e3, s3] = h2, [n4, o3] = h2;
            break;
        case "m":
            e3 += h2[0], s3 += h2[1], a3.push({
                key: "M",
                data: [
                    e3,
                    s3
                ]
            }), n4 = e3, o3 = s3;
            break;
        case "L":
            a3.push({
                key: "L",
                data: [
                    ...h2
                ]
            }), [e3, s3] = h2;
            break;
        case "l":
            e3 += h2[0], s3 += h2[1], a3.push({
                key: "L",
                data: [
                    e3,
                    s3
                ]
            });
            break;
        case "C":
            a3.push({
                key: "C",
                data: [
                    ...h2
                ]
            }), e3 = h2[4], s3 = h2[5];
            break;
        case "c":
            {
                const t11 = h2.map((t12, n5)=>n5 % 2 ? t12 + s3 : t12 + e3
                );
                a3.push({
                    key: "C",
                    data: t11
                }), e3 = t11[4], s3 = t11[5];
                break;
            }
        case "Q":
            a3.push({
                key: "Q",
                data: [
                    ...h2
                ]
            }), e3 = h2[2], s3 = h2[3];
            break;
        case "q":
            {
                const t11 = h2.map((t12, n5)=>n5 % 2 ? t12 + s3 : t12 + e3
                );
                a3.push({
                    key: "Q",
                    data: t11
                }), e3 = t11[2], s3 = t11[3];
                break;
            }
        case "A":
            a3.push({
                key: "A",
                data: [
                    ...h2
                ]
            }), e3 = h2[5], s3 = h2[6];
            break;
        case "a":
            e3 += h2[5], s3 += h2[6], a3.push({
                key: "A",
                data: [
                    h2[0],
                    h2[1],
                    h2[2],
                    h2[3],
                    h2[4],
                    e3,
                    s3
                ]
            });
            break;
        case "H":
            a3.push({
                key: "H",
                data: [
                    ...h2
                ]
            }), e3 = h2[0];
            break;
        case "h":
            e3 += h2[0], a3.push({
                key: "H",
                data: [
                    e3
                ]
            });
            break;
        case "V":
            a3.push({
                key: "V",
                data: [
                    ...h2
                ]
            }), s3 = h2[0];
            break;
        case "v":
            s3 += h2[0], a3.push({
                key: "V",
                data: [
                    s3
                ]
            });
            break;
        case "S":
            a3.push({
                key: "S",
                data: [
                    ...h2
                ]
            }), e3 = h2[2], s3 = h2[3];
            break;
        case "s":
            {
                const t11 = h2.map((t12, n5)=>n5 % 2 ? t12 + s3 : t12 + e3
                );
                a3.push({
                    key: "S",
                    data: t11
                }), e3 = t11[2], s3 = t11[3];
                break;
            }
        case "T":
            a3.push({
                key: "T",
                data: [
                    ...h2
                ]
            }), e3 = h2[0], s3 = h2[1];
            break;
        case "t":
            e3 += h2[0], s3 += h2[1], a3.push({
                key: "T",
                data: [
                    e3,
                    s3
                ]
            });
            break;
        case "Z":
        case "z":
            a3.push({
                key: "Z",
                data: []
            }), e3 = n4, s3 = o3;
    }
    return a3;
}
function m1(t10) {
    const e3 = [];
    let s3 = "", n4 = 0, o3 = 0, a3 = 0, r3 = 0, h2 = 0, i3 = 0;
    for (const { key: c2 , data: l2  } of t10){
        switch(c2){
            case "M":
                e3.push({
                    key: "M",
                    data: [
                        ...l2
                    ]
                }), [n4, o3] = l2, [a3, r3] = l2;
                break;
            case "C":
                e3.push({
                    key: "C",
                    data: [
                        ...l2
                    ]
                }), n4 = l2[4], o3 = l2[5], h2 = l2[2], i3 = l2[3];
                break;
            case "L":
                e3.push({
                    key: "L",
                    data: [
                        ...l2
                    ]
                }), [n4, o3] = l2;
                break;
            case "H":
                n4 = l2[0], e3.push({
                    key: "L",
                    data: [
                        n4,
                        o3
                    ]
                });
                break;
            case "V":
                o3 = l2[0], e3.push({
                    key: "L",
                    data: [
                        n4,
                        o3
                    ]
                });
                break;
            case "S":
                {
                    let t11 = 0, a4 = 0;
                    "C" === s3 || "S" === s3 ? (t11 = n4 + (n4 - h2), a4 = o3 + (o3 - i3)) : (t11 = n4, a4 = o3), e3.push({
                        key: "C",
                        data: [
                            t11,
                            a4,
                            ...l2
                        ]
                    }), h2 = l2[0], i3 = l2[1], n4 = l2[2], o3 = l2[3];
                    break;
                }
            case "T":
                {
                    const [t11, a4] = l2;
                    let r4 = 0, c3 = 0;
                    "Q" === s3 || "T" === s3 ? (r4 = n4 + (n4 - h2), c3 = o3 + (o3 - i3)) : (r4 = n4, c3 = o3);
                    const u2 = n4 + 2 * (r4 - n4) / 3, f2 = o3 + 2 * (c3 - o3) / 3, p2 = t11 + 2 * (r4 - t11) / 3, d2 = a4 + 2 * (c3 - a4) / 3;
                    e3.push({
                        key: "C",
                        data: [
                            u2,
                            f2,
                            p2,
                            d2,
                            t11,
                            a4
                        ]
                    }), h2 = r4, i3 = c3, n4 = t11, o3 = a4;
                    break;
                }
            case "Q":
                {
                    const [t11, s4, a4, r4] = l2, c3 = n4 + 2 * (t11 - n4) / 3, u2 = o3 + 2 * (s4 - o3) / 3, f2 = a4 + 2 * (t11 - a4) / 3, p2 = r4 + 2 * (s4 - r4) / 3;
                    e3.push({
                        key: "C",
                        data: [
                            c3,
                            u2,
                            f2,
                            p2,
                            a4,
                            r4
                        ]
                    }), h2 = t11, i3 = s4, n4 = a4, o3 = r4;
                    break;
                }
            case "A":
                {
                    const t11 = Math.abs(l2[0]), s4 = Math.abs(l2[1]), a4 = l2[2], r4 = l2[3], h3 = l2[4], i4 = l2[5], c3 = l2[6];
                    if (0 === t11 || 0 === s4) e3.push({
                        key: "C",
                        data: [
                            n4,
                            o3,
                            i4,
                            c3,
                            i4,
                            c3
                        ]
                    }), n4 = i4, o3 = c3;
                    else if (n4 !== i4 || o3 !== c3) {
                        P2(n4, o3, i4, c3, t11, s4, a4, r4, h3).forEach(function(t12) {
                            e3.push({
                                key: "C",
                                data: t12
                            });
                        }), n4 = i4, o3 = c3;
                    }
                    break;
                }
            case "Z":
                e3.push({
                    key: "Z",
                    data: []
                }), n4 = a3, o3 = r3;
        }
        s3 = c2;
    }
    return e3;
}
function w1(t10, e3, s3) {
    return [
        t10 * Math.cos(s3) - e3 * Math.sin(s3),
        t10 * Math.sin(s3) + e3 * Math.cos(s3)
    ];
}
function P2(t10, e3, s3, n4, o3, a3, r3, h2, i3, c2) {
    const l2 = (u3 = r3, Math.PI * u3 / 180);
    var u3;
    let f2 = [], p2 = 0, d2 = 0, g2 = 0, M2 = 0;
    if (c2) [p2, d2, g2, M2] = c2;
    else {
        [t10, e3] = w1(t10, e3, -l2), [s3, n4] = w1(s3, n4, -l2);
        const r4 = (t10 - s3) / 2, c3 = (e3 - n4) / 2;
        let u4 = r4 * r4 / (o3 * o3) + c3 * c3 / (a3 * a3);
        u4 > 1 && (u4 = Math.sqrt(u4), o3 *= u4, a3 *= u4);
        const f3 = o3 * o3, k2 = a3 * a3, b2 = f3 * k2 - f3 * c3 * c3 - k2 * r4 * r4, y2 = f3 * c3 * c3 + k2 * r4 * r4, m2 = (h2 === i3 ? -1 : 1) * Math.sqrt(Math.abs(b2 / y2));
        g2 = m2 * o3 * c3 / a3 + (t10 + s3) / 2, M2 = m2 * -a3 * r4 / o3 + (e3 + n4) / 2, p2 = Math.asin(parseFloat(((e3 - M2) / a3).toFixed(9))), d2 = Math.asin(parseFloat(((n4 - M2) / a3).toFixed(9))), t10 < g2 && (p2 = Math.PI - p2), s3 < g2 && (d2 = Math.PI - d2), p2 < 0 && (p2 = 2 * Math.PI + p2), d2 < 0 && (d2 = 2 * Math.PI + d2), i3 && p2 > d2 && (p2 -= 2 * Math.PI), !i3 && d2 > p2 && (d2 -= 2 * Math.PI);
    }
    let k2 = d2 - p2;
    if (Math.abs(k2) > 120 * Math.PI / 180) {
        const t11 = d2, e4 = s3, h3 = n4;
        d2 = i3 && d2 > p2 ? p2 + 120 * Math.PI / 180 * 1 : p2 + 120 * Math.PI / 180 * -1, f2 = P2(s3 = g2 + o3 * Math.cos(d2), n4 = M2 + a3 * Math.sin(d2), s3, n4, o3, a3, r3, 0, i3, [
            d2,
            d2,
            g2,
            M2
        ]);
    }
    k2 = d2 - p2;
    const b2 = Math.cos(p2), y2 = Math.sin(p2), m2 = Math.cos(d2), x1 = Math.sin(d2), v1 = Math.tan(k2 / 4), O1 = 4 / 3 * o3 * v1, S1 = 4 / 3 * a3 * v1, L = [
        t10,
        e3
    ], T1 = [
        t10 + O1 * y2,
        e3 - S1 * b2
    ], I1 = [
        s3 + O1 * x1,
        n4 - S1 * m2
    ], A = [
        s3,
        n4
    ];
    if (T1[0] = 2 * L[0] - T1[0], T1[1] = 2 * L[1] - T1[1], c2) return [
        T1,
        I1,
        A
    ].concat(f2);
    {
        f2 = [
            T1,
            I1,
            A
        ].concat(f2);
        const t11 = [];
        for(let e4 = 0; e4 < f2.length; e4 += 3){
            const s4 = w1(f2[e4][0], f2[e4][1], l2), n5 = w1(f2[e4 + 1][0], f2[e4 + 1][1], l2), o4 = w1(f2[e4 + 2][0], f2[e4 + 2][1], l2);
            t11.push([
                s4[0],
                s4[1],
                n5[0],
                n5[1],
                o4[0],
                o4[1]
            ]);
        }
        return t11;
    }
}
const x1 = {
    randOffset: function(t10, e3) {
        return W(t10, e3);
    },
    randOffsetWithRange: function(t10, e3, s3) {
        return E2(t10, e3, s3);
    },
    ellipse: function(t10, e3, s3, n4, o3) {
        const a3 = T2(s3, n4, o3);
        return I2(t10, e3, o3, a3).opset;
    },
    doubleLineOps: function(t10, e3, s3, n4, o3) {
        return z(t10, e3, s3, n4, o3, !0);
    }
};
function v1(t10, e3, s3, n4, o3) {
    return {
        type: "path",
        ops: z(t10, e3, s3, n4, o3)
    };
}
function O1(t10, e3, s3) {
    const n4 = (t10 || []).length;
    if (n4 > 2) {
        const o3 = [];
        for(let e4 = 0; e4 < n4 - 1; e4++)o3.push(...z(t10[e4][0], t10[e4][1], t10[e4 + 1][0], t10[e4 + 1][1], s3));
        return e3 && o3.push(...z(t10[n4 - 1][0], t10[n4 - 1][1], t10[0][0], t10[0][1], s3)), {
            type: "path",
            ops: o3
        };
    }
    return 2 === n4 ? v1(t10[0][0], t10[0][1], t10[1][0], t10[1][1], s3) : {
        type: "path",
        ops: []
    };
}
function S1(t10, e3, s3, n4, o3) {
    return (function(t11, e4) {
        return O1(t11, !0, e4);
    })([
        [
            t10,
            e3
        ],
        [
            t10 + s3,
            e3
        ],
        [
            t10 + s3,
            e3 + n4
        ],
        [
            t10,
            e3 + n4
        ]
    ], o3);
}
function L(t10, e3) {
    let s3 = $2(t10, 1 * (1 + 0.2 * e3.roughness), e3);
    if (!e3.disableMultiStroke) {
        const n4 = $2(t10, 1.5 * (1 + 0.22 * e3.roughness), function(t11) {
            const e4 = Object.assign({
            }, t11);
            e4.randomizer = void 0, t11.seed && (e4.seed = t11.seed + 1);
            return e4;
        }(e3));
        s3 = s3.concat(n4);
    }
    return {
        type: "path",
        ops: s3
    };
}
function T2(t10, e3, s3) {
    const n4 = Math.sqrt(2 * Math.PI * Math.sqrt((Math.pow(t10 / 2, 2) + Math.pow(e3 / 2, 2)) / 2)), o3 = Math.max(s3.curveStepCount, s3.curveStepCount / Math.sqrt(200) * n4), a3 = 2 * Math.PI / o3;
    let r3 = Math.abs(t10 / 2), h2 = Math.abs(e3 / 2);
    const i3 = 1 - s3.curveFitting;
    return r3 += W(r3 * i3, s3), h2 += W(h2 * i3, s3), {
        increment: a3,
        rx: r3,
        ry: h2
    };
}
function I2(t10, e3, s3, n4) {
    const [o3, a3] = q(n4.increment, t10, e3, n4.rx, n4.ry, 1, n4.increment * E2(0.1, E2(0.4, 1, s3), s3), s3);
    let r3 = G(o3, null, s3);
    if (!s3.disableMultiStroke) {
        const [o4] = q(n4.increment, t10, e3, n4.rx, n4.ry, 1.5, 0, s3), a4 = G(o4, null, s3);
        r3 = r3.concat(a4);
    }
    return {
        estimatedPoints: a3,
        opset: {
            type: "path",
            ops: r3
        }
    };
}
function A(t10, e3, s3, n4, o3, a3, r3, h2, i3) {
    const c2 = t10, l2 = e3;
    let u3 = Math.abs(s3 / 2), f2 = Math.abs(n4 / 2);
    u3 += W(0.01 * u3, i3), f2 += W(0.01 * f2, i3);
    let p2 = o3, d2 = a3;
    for(; p2 < 0;)p2 += 2 * Math.PI, d2 += 2 * Math.PI;
    d2 - p2 > 2 * Math.PI && (p2 = 0, d2 = 2 * Math.PI);
    const g2 = 2 * Math.PI / i3.curveStepCount, M2 = Math.min(g2 / 2, (d2 - p2) / 2), k2 = F(M2, t10, e3, u3, f2, p2, d2, 1, i3);
    if (!i3.disableMultiStroke) {
        const t11 = F(M2, t10, e3, u3, f2, p2, d2, 1.5, i3);
        k2.push(...t11);
    }
    return r3 && (h2 ? k2.push(...z(t10, e3, t10 + u3 * Math.cos(p2), e3 + f2 * Math.sin(p2), i3), ...z(t10, e3, t10 + u3 * Math.cos(d2), e3 + f2 * Math.sin(d2), i3)) : k2.push({
        op: "lineTo",
        data: [
            t10,
            e3
        ]
    }, {
        op: "lineTo",
        data: [
            t10 + u3 * Math.cos(p2),
            e3 + f2 * Math.sin(p2)
        ]
    })), {
        type: "path",
        ops: k2
    };
}
function _(t10, e3) {
    const s3 = [];
    if (t10.length) {
        const n4 = e3.maxRandomnessOffset || 0, o3 = t10.length;
        if (o3 > 2) {
            s3.push({
                op: "move",
                data: [
                    t10[0][0] + W(n4, e3),
                    t10[0][1] + W(n4, e3)
                ]
            });
            for(let a3 = 1; a3 < o3; a3++)s3.push({
                op: "lineTo",
                data: [
                    t10[a3][0] + W(n4, e3),
                    t10[a3][1] + W(n4, e3)
                ]
            });
        }
    }
    return {
        type: "fillPath",
        ops: s3
    };
}
function C(t10, e3) {
    return (function(t11, e4) {
        let s3 = t11.fillStyle || "hachure";
        if (!d1[s3]) switch(s3){
            case "zigzag":
                d1[s3] || (d1[s3] = new c1(e4));
                break;
            case "cross-hatch":
                d1[s3] || (d1[s3] = new l1(e4));
                break;
            case "dots":
                d1[s3] || (d1[s3] = new u1(e4));
                break;
            case "dashed":
                d1[s3] || (d1[s3] = new f1(e4));
                break;
            case "zigzag-line":
                d1[s3] || (d1[s3] = new p1(e4));
                break;
            case "hachure":
            default:
                s3 = "hachure", d1[s3] || (d1[s3] = new i2(e4));
        }
        return d1[s3];
    })(e3, x1).fillPolygon(t10, e3);
}
function D(t10) {
    return t10.randomizer || (t10.randomizer = new g1(t10.seed || 0)), t10.randomizer.next();
}
function E2(t10, e3, s3, n4 = 1) {
    return s3.roughness * n4 * (D(s3) * (e3 - t10) + t10);
}
function W(t10, e3, s3 = 1) {
    return E2(-t10, t10, e3, s3);
}
function z(t10, e3, s3, n4, o3, a3 = !1) {
    const r3 = a3 ? o3.disableMultiStrokeFill : o3.disableMultiStroke, h2 = R(t10, e3, s3, n4, o3, !0, !1);
    if (r3) return h2;
    const i3 = R(t10, e3, s3, n4, o3, !0, !0);
    return h2.concat(i3);
}
function R(t10, e3, s3, n4, o3, a3, r3) {
    const h2 = Math.pow(t10 - s3, 2) + Math.pow(e3 - n4, 2), i3 = Math.sqrt(h2);
    let c2 = 1;
    c2 = i3 < 200 ? 1 : i3 > 500 ? 0.4 : -0.0016668 * i3 + 1.233334;
    let l2 = o3.maxRandomnessOffset || 0;
    l2 * l2 * 100 > h2 && (l2 = i3 / 10);
    const u3 = l2 / 2, f2 = 0.2 + 0.2 * D(o3);
    let p2 = o3.bowing * o3.maxRandomnessOffset * (n4 - e3) / 200, d2 = o3.bowing * o3.maxRandomnessOffset * (t10 - s3) / 200;
    p2 = W(p2, o3, c2), d2 = W(d2, o3, c2);
    const g2 = [], M2 = ()=>W(u3, o3, c2)
    , k2 = ()=>W(l2, o3, c2)
    ;
    return a3 && (r3 ? g2.push({
        op: "move",
        data: [
            t10 + M2(),
            e3 + M2()
        ]
    }) : g2.push({
        op: "move",
        data: [
            t10 + W(l2, o3, c2),
            e3 + W(l2, o3, c2)
        ]
    })), r3 ? g2.push({
        op: "bcurveTo",
        data: [
            p2 + t10 + (s3 - t10) * f2 + M2(),
            d2 + e3 + (n4 - e3) * f2 + M2(),
            p2 + t10 + 2 * (s3 - t10) * f2 + M2(),
            d2 + e3 + 2 * (n4 - e3) * f2 + M2(),
            s3 + M2(),
            n4 + M2()
        ]
    }) : g2.push({
        op: "bcurveTo",
        data: [
            p2 + t10 + (s3 - t10) * f2 + k2(),
            d2 + e3 + (n4 - e3) * f2 + k2(),
            p2 + t10 + 2 * (s3 - t10) * f2 + k2(),
            d2 + e3 + 2 * (n4 - e3) * f2 + k2(),
            s3 + k2(),
            n4 + k2()
        ]
    }), g2;
}
function $2(t10, e3, s3) {
    const n4 = [];
    n4.push([
        t10[0][0] + W(e3, s3),
        t10[0][1] + W(e3, s3)
    ]), n4.push([
        t10[0][0] + W(e3, s3),
        t10[0][1] + W(e3, s3)
    ]);
    for(let o3 = 1; o3 < t10.length; o3++)n4.push([
        t10[o3][0] + W(e3, s3),
        t10[o3][1] + W(e3, s3)
    ]), o3 === t10.length - 1 && n4.push([
        t10[o3][0] + W(e3, s3),
        t10[o3][1] + W(e3, s3)
    ]);
    return G(n4, null, s3);
}
function G(t10, e3, s3) {
    const n4 = t10.length, o3 = [];
    if (n4 > 3) {
        const a3 = [], r3 = 1 - s3.curveTightness;
        o3.push({
            op: "move",
            data: [
                t10[1][0],
                t10[1][1]
            ]
        });
        for(let e4 = 1; e4 + 2 < n4; e4++){
            const s4 = t10[e4];
            a3[0] = [
                s4[0],
                s4[1]
            ], a3[1] = [
                s4[0] + (r3 * t10[e4 + 1][0] - r3 * t10[e4 - 1][0]) / 6,
                s4[1] + (r3 * t10[e4 + 1][1] - r3 * t10[e4 - 1][1]) / 6
            ], a3[2] = [
                t10[e4 + 1][0] + (r3 * t10[e4][0] - r3 * t10[e4 + 2][0]) / 6,
                t10[e4 + 1][1] + (r3 * t10[e4][1] - r3 * t10[e4 + 2][1]) / 6
            ], a3[3] = [
                t10[e4 + 1][0],
                t10[e4 + 1][1]
            ], o3.push({
                op: "bcurveTo",
                data: [
                    a3[1][0],
                    a3[1][1],
                    a3[2][0],
                    a3[2][1],
                    a3[3][0],
                    a3[3][1]
                ]
            });
        }
        if (e3 && 2 === e3.length) {
            const t11 = s3.maxRandomnessOffset;
            o3.push({
                op: "lineTo",
                data: [
                    e3[0] + W(t11, s3),
                    e3[1] + W(t11, s3)
                ]
            });
        }
    } else 3 === n4 ? (o3.push({
        op: "move",
        data: [
            t10[1][0],
            t10[1][1]
        ]
    }), o3.push({
        op: "bcurveTo",
        data: [
            t10[1][0],
            t10[1][1],
            t10[2][0],
            t10[2][1],
            t10[2][0],
            t10[2][1]
        ]
    })) : 2 === n4 && o3.push(...z(t10[0][0], t10[0][1], t10[1][0], t10[1][1], s3));
    return o3;
}
function q(t10, e3, s3, n4, o3, a3, r3, h2) {
    const i3 = [], c2 = [], l2 = W(0.5, h2) - Math.PI / 2;
    c2.push([
        W(a3, h2) + e3 + 0.9 * n4 * Math.cos(l2 - t10),
        W(a3, h2) + s3 + 0.9 * o3 * Math.sin(l2 - t10)
    ]);
    for(let r4 = l2; r4 < 2 * Math.PI + l2 - 0.01; r4 += t10){
        const t11 = [
            W(a3, h2) + e3 + n4 * Math.cos(r4),
            W(a3, h2) + s3 + o3 * Math.sin(r4)
        ];
        i3.push(t11), c2.push(t11);
    }
    return c2.push([
        W(a3, h2) + e3 + n4 * Math.cos(l2 + 2 * Math.PI + 0.5 * r3),
        W(a3, h2) + s3 + o3 * Math.sin(l2 + 2 * Math.PI + 0.5 * r3)
    ]), c2.push([
        W(a3, h2) + e3 + 0.98 * n4 * Math.cos(l2 + r3),
        W(a3, h2) + s3 + 0.98 * o3 * Math.sin(l2 + r3)
    ]), c2.push([
        W(a3, h2) + e3 + 0.9 * n4 * Math.cos(l2 + 0.5 * r3),
        W(a3, h2) + s3 + 0.9 * o3 * Math.sin(l2 + 0.5 * r3)
    ]), [
        c2,
        i3
    ];
}
function F(t10, e3, s3, n4, o3, a3, r3, h2, i3) {
    const c2 = a3 + W(0.1, i3), l2 = [];
    l2.push([
        W(h2, i3) + e3 + 0.9 * n4 * Math.cos(c2 - t10),
        W(h2, i3) + s3 + 0.9 * o3 * Math.sin(c2 - t10)
    ]);
    for(let a4 = c2; a4 <= r3; a4 += t10)l2.push([
        W(h2, i3) + e3 + n4 * Math.cos(a4),
        W(h2, i3) + s3 + o3 * Math.sin(a4)
    ]);
    return l2.push([
        e3 + n4 * Math.cos(r3),
        s3 + o3 * Math.sin(r3)
    ]), l2.push([
        e3 + n4 * Math.cos(r3),
        s3 + o3 * Math.sin(r3)
    ]), G(l2, null, i3);
}
function j(t10, e3, s3, n4, o3, a3, r3, h2) {
    const i3 = [], c2 = [
        h2.maxRandomnessOffset || 1,
        (h2.maxRandomnessOffset || 1) + 0.3
    ];
    let l2 = [
        0,
        0
    ];
    const u3 = h2.disableMultiStroke ? 1 : 2;
    for(let f2 = 0; f2 < u3; f2++)0 === f2 ? i3.push({
        op: "move",
        data: [
            r3[0],
            r3[1]
        ]
    }) : i3.push({
        op: "move",
        data: [
            r3[0] + W(c2[0], h2),
            r3[1] + W(c2[0], h2)
        ]
    }), l2 = [
        o3 + W(c2[f2], h2),
        a3 + W(c2[f2], h2)
    ], i3.push({
        op: "bcurveTo",
        data: [
            t10 + W(c2[f2], h2),
            e3 + W(c2[f2], h2),
            s3 + W(c2[f2], h2),
            n4 + W(c2[f2], h2),
            l2[0],
            l2[1]
        ]
    });
    return i3;
}
function N(t10) {
    return [
        ...t10
    ];
}
function Z(t10, e3) {
    return Math.pow(t10[0] - e3[0], 2) + Math.pow(t10[1] - e3[1], 2);
}
function Q(t10, e3, s3) {
    const n4 = Z(e3, s3);
    if (0 === n4) return Z(t10, e3);
    let o3 = ((t10[0] - e3[0]) * (s3[0] - e3[0]) + (t10[1] - e3[1]) * (s3[1] - e3[1])) / n4;
    return o3 = Math.max(0, Math.min(1, o3)), Z(t10, H(e3, s3, o3));
}
function H(t10, e3, s3) {
    return [
        t10[0] + (e3[0] - t10[0]) * s3,
        t10[1] + (e3[1] - t10[1]) * s3
    ];
}
function V(t10, e3, s3, n4) {
    const o3 = n4 || [];
    if ((function(t11, e4) {
        const s4 = t11[e4 + 0], n5 = t11[e4 + 1], o4 = t11[e4 + 2], a3 = t11[e4 + 3];
        let r3 = 3 * n5[0] - 2 * s4[0] - a3[0];
        r3 *= r3;
        let h2 = 3 * n5[1] - 2 * s4[1] - a3[1];
        h2 *= h2;
        let i3 = 3 * o4[0] - 2 * a3[0] - s4[0];
        i3 *= i3;
        let c2 = 3 * o4[1] - 2 * a3[1] - s4[1];
        return c2 *= c2, r3 < i3 && (r3 = i3), h2 < c2 && (h2 = c2), r3 + h2;
    })(t10, e3) < s3) {
        const s4 = t10[e3 + 0];
        if (o3.length) {
            (a3 = o3[o3.length - 1], r3 = s4, Math.sqrt(Z(a3, r3))) > 1 && o3.push(s4);
        } else o3.push(s4);
        o3.push(t10[e3 + 3]);
    } else {
        const n5 = 0.5, a3 = t10[e3 + 0], r3 = t10[e3 + 1], h2 = t10[e3 + 2], i3 = t10[e3 + 3], c2 = H(a3, r3, 0.5), l2 = H(r3, h2, 0.5), u3 = H(h2, i3, 0.5), f2 = H(c2, l2, 0.5), p2 = H(l2, u3, 0.5), d2 = H(f2, p2, 0.5);
        V([
            a3,
            c2,
            f2,
            d2
        ], 0, s3, o3), V([
            d2,
            p2,
            u3,
            i3
        ], 0, s3, o3);
    }
    var a3, r3;
    return o3;
}
function B(t10, e3) {
    return X(t10, 0, t10.length, e3);
}
function X(t10, e3, s3, n4, o3) {
    const a3 = o3 || [], r3 = t10[e3], h2 = t10[s3 - 1];
    let i3 = 0, c2 = 1;
    for(let n5 = e3 + 1; n5 < s3 - 1; ++n5){
        const e4 = Q(t10[n5], r3, h2);
        e4 > i3 && (i3 = e4, c2 = n5);
    }
    return Math.sqrt(i3) > n4 ? (X(t10, e3, c2 + 1, n4, a3), X(t10, c2, s3, n4, a3)) : (a3.length || a3.push(r3), a3.push(h2)), a3;
}
function J(t10, e3 = 0.15, s3) {
    const n4 = [], o3 = (t10.length - 1) / 3;
    for(let s4 = 0; s4 < o3; s4++){
        V(t10, 3 * s4, e3, n4);
    }
    return s3 && s3 > 0 ? X(n4, 0, n4.length, s3) : n4;
}
class U {
    constructor(t10){
        this.defaultOptions = {
            maxRandomnessOffset: 2,
            roughness: 1,
            bowing: 1,
            stroke: "#000",
            strokeWidth: 1,
            curveTightness: 0,
            curveFitting: 0.95,
            curveStepCount: 9,
            fillStyle: "hachure",
            fillWeight: -1,
            hachureAngle: -41,
            hachureGap: -1,
            dashOffset: -1,
            dashGap: -1,
            zigzagOffset: -1,
            seed: 0,
            combineNestedSvgPaths: !1,
            disableMultiStroke: !1,
            disableMultiStrokeFill: !1
        }, this.config = t10 || {
        }, this.config.options && (this.defaultOptions = this._o(this.config.options));
    }
    static newSeed() {
        return Math.floor(Math.random() * 2 ** 31);
    }
    _o(t) {
        return t ? Object.assign({
        }, this.defaultOptions, t) : this.defaultOptions;
    }
    _d(t, e, s) {
        return {
            shape: t,
            sets: e || [],
            options: s || this.defaultOptions
        };
    }
    line(t, e, s, n, o) {
        const a3 = this._o(o);
        return this._d("line", [
            v1(t, e, s, n, a3)
        ], a3);
    }
    rectangle(t, e, s, n, o) {
        const a3 = this._o(o), r3 = [], h2 = S1(t, e, s, n, a3);
        if (a3.fill) {
            const o3 = [
                [
                    t,
                    e
                ],
                [
                    t + s,
                    e
                ],
                [
                    t + s,
                    e + n
                ],
                [
                    t,
                    e + n
                ]
            ];
            "solid" === a3.fillStyle ? r3.push(_(o3, a3)) : r3.push(C(o3, a3));
        }
        return a3.stroke !== "none" && r3.push(h2), this._d("rectangle", r3, a3);
    }
    ellipse(t, e, s, n, o) {
        const a3 = this._o(o), r3 = [], h2 = T2(s, n, a3), i3 = I2(t, e, a3, h2);
        if (a3.fill) {
            if ("solid" === a3.fillStyle) {
                const s3 = I2(t, e, a3, h2).opset;
                s3.type = "fillPath", r3.push(s3);
            } else r3.push(C(i3.estimatedPoints, a3));
        }
        return a3.stroke !== "none" && r3.push(i3.opset), this._d("ellipse", r3, a3);
    }
    circle(t, e, s, n) {
        const o3 = this.ellipse(t, e, s, s, n);
        return o3.shape = "circle", o3;
    }
    linearPath(t, e) {
        const s3 = this._o(e);
        return this._d("linearPath", [
            O1(t, !1, s3)
        ], s3);
    }
    arc(t, e, s, n, o, a, r = !1, h) {
        const i3 = this._o(h), c2 = [], l2 = A(t, e, s, n, o, a, r, !0, i3);
        if (r && i3.fill) {
            if ("solid" === i3.fillStyle) {
                const r3 = A(t, e, s, n, o, a, !0, !1, i3);
                r3.type = "fillPath", c2.push(r3);
            } else c2.push(function(t11, e3, s3, n4, o3, a3, r3) {
                const h3 = t11, i4 = e3;
                let c3 = Math.abs(s3 / 2), l3 = Math.abs(n4 / 2);
                c3 += W(0.01 * c3, r3), l3 += W(0.01 * l3, r3);
                let u3 = o3, f2 = a3;
                for(; u3 < 0;)u3 += 2 * Math.PI, f2 += 2 * Math.PI;
                f2 - u3 > 2 * Math.PI && (u3 = 0, f2 = 2 * Math.PI);
                const p2 = (f2 - u3) / r3.curveStepCount, d2 = [];
                for(let t12 = u3; t12 <= f2; t12 += p2)d2.push([
                    t11 + c3 * Math.cos(t12),
                    e3 + l3 * Math.sin(t12)
                ]);
                return d2.push([
                    t11 + c3 * Math.cos(f2),
                    e3 + l3 * Math.sin(f2)
                ]), d2.push([
                    t11,
                    e3
                ]), C(d2, r3);
            }(t, e, s, n, o, a, i3));
        }
        return i3.stroke !== "none" && c2.push(l2), this._d("arc", c2, i3);
    }
    curve(t, e) {
        const s3 = this._o(e), n4 = [], o3 = L(t, s3);
        if (s3.fill && s3.fill !== "none" && t.length >= 3) {
            const e3 = J(function(t11, e4 = 0) {
                const s4 = t11.length;
                if (s4 < 3) throw new Error("A curve must have at least three points.");
                const n5 = [];
                if (3 === s4) n5.push(N(t11[0]), N(t11[1]), N(t11[2]), N(t11[2]));
                else {
                    const s5 = [];
                    s5.push(t11[0], t11[0]);
                    for(let e5 = 1; e5 < t11.length; e5++)s5.push(t11[e5]), e5 === t11.length - 1 && s5.push(t11[e5]);
                    const o4 = [], a3 = 1 - e4;
                    n5.push(N(s5[0]));
                    for(let t12 = 1; t12 + 2 < s5.length; t12++){
                        const e6 = s5[t12];
                        o4[0] = [
                            e6[0],
                            e6[1]
                        ], o4[1] = [
                            e6[0] + (a3 * s5[t12 + 1][0] - a3 * s5[t12 - 1][0]) / 6,
                            e6[1] + (a3 * s5[t12 + 1][1] - a3 * s5[t12 - 1][1]) / 6
                        ], o4[2] = [
                            s5[t12 + 1][0] + (a3 * s5[t12][0] - a3 * s5[t12 + 2][0]) / 6,
                            s5[t12 + 1][1] + (a3 * s5[t12][1] - a3 * s5[t12 + 2][1]) / 6
                        ], o4[3] = [
                            s5[t12 + 1][0],
                            s5[t12 + 1][1]
                        ], n5.push(o4[1], o4[2], o4[3]);
                    }
                }
                return n5;
            }(t), 10, (1 + s3.roughness) / 2);
            "solid" === s3.fillStyle ? n4.push(_(e3, s3)) : n4.push(C(e3, s3));
        }
        return s3.stroke !== "none" && n4.push(o3), this._d("curve", n4, s3);
    }
    polygon(t, e) {
        const s3 = this._o(e), n4 = [], o3 = O1(t, !0, s3);
        return s3.fill && ("solid" === s3.fillStyle ? n4.push(_(t, s3)) : n4.push(C(t, s3))), s3.stroke !== "none" && n4.push(o3), this._d("polygon", n4, s3);
    }
    path(t, e) {
        const s3 = this._o(e), n4 = [];
        if (!t) return this._d("path", n4, s3);
        t = (t || "").replace(/\n/g, " ").replace(/(-\s)/g, "-").replace("/(ss)/g", " ");
        const o3 = s3.fill && "transparent" !== s3.fill && s3.fill !== "none", a3 = s3.stroke !== "none", r3 = !!(s3.simplification && s3.simplification < 1), h3 = function(t11, e3, s4) {
            const n5 = m1(y1(b1(t11))), o4 = [];
            let a4 = [], r4 = [
                0,
                0
            ], h4 = [];
            const i3 = ()=>{
                h4.length >= 4 && a4.push(...J(h4, e3)), h4 = [];
            }, c2 = ()=>{
                i3(), a4.length && (o4.push(a4), a4 = []);
            };
            for (const { key: t12 , data: e4  } of n5)switch(t12){
                case "M":
                    c2(), r4 = [
                        e4[0],
                        e4[1]
                    ], a4.push(r4);
                    break;
                case "L":
                    i3(), a4.push([
                        e4[0],
                        e4[1]
                    ]);
                    break;
                case "C":
                    if (!h4.length) {
                        const t13 = a4.length ? a4[a4.length - 1] : r4;
                        h4.push([
                            t13[0],
                            t13[1]
                        ]);
                    }
                    h4.push([
                        e4[0],
                        e4[1]
                    ]), h4.push([
                        e4[2],
                        e4[3]
                    ]), h4.push([
                        e4[4],
                        e4[5]
                    ]);
                    break;
                case "Z":
                    i3(), a4.push([
                        r4[0],
                        r4[1]
                    ]);
            }
            if (c2(), !s4) return o4;
            const l2 = [];
            for (const t13 of o4){
                const e5 = B(t13, s4);
                e5.length && l2.push(e5);
            }
            return l2;
        }(t, 1, r3 ? 4 - 4 * s3.simplification : (1 + s3.roughness) / 2);
        if (o3) {
            if (s3.combineNestedSvgPaths) {
                const t11 = [];
                h3.forEach((e3)=>t11.push(...e3)
                ), "solid" === s3.fillStyle ? n4.push(_(t11, s3)) : n4.push(C(t11, s3));
            } else h3.forEach((t11)=>{
                "solid" === s3.fillStyle ? n4.push(_(t11, s3)) : n4.push(C(t11, s3));
            });
        }
        return a3 && (r3 ? h3.forEach((t11)=>{
            n4.push(O1(t11, !1, s3));
        }) : n4.push(function(t11, e3) {
            const s4 = m1(y1(b1(t11))), n5 = [];
            let o4 = [
                0,
                0
            ], a4 = [
                0,
                0
            ];
            for (const { key: t12 , data: r4  } of s4)switch(t12){
                case "M":
                    {
                        const t13 = 1 * (e3.maxRandomnessOffset || 0);
                        n5.push({
                            op: "move",
                            data: r4.map((s5)=>s5 + W(t13, e3)
                            )
                        }), a4 = [
                            r4[0],
                            r4[1]
                        ], o4 = [
                            r4[0],
                            r4[1]
                        ];
                        break;
                    }
                case "L":
                    n5.push(...z(a4[0], a4[1], r4[0], r4[1], e3)), a4 = [
                        r4[0],
                        r4[1]
                    ];
                    break;
                case "C":
                    {
                        const [t13, s5, o5, h4, i3, c2] = r4;
                        n5.push(...j(t13, s5, o5, h4, i3, c2, a4, e3)), a4 = [
                            i3,
                            c2
                        ];
                        break;
                    }
                case "Z":
                    n5.push(...z(a4[0], a4[1], o4[0], o4[1], e3)), a4 = [
                        o4[0],
                        o4[1]
                    ];
            }
            return {
                type: "path",
                ops: n5
            };
        }(t, s3))), this._d("path", n4, s3);
    }
    opsToPath(t) {
        let e3 = "";
        for (const s3 of t.ops){
            const t11 = s3.data;
            switch(s3.op){
                case "move":
                    e3 += `M${t11[0]} ${t11[1]} `;
                    break;
                case "bcurveTo":
                    e3 += `C${t11[0]} ${t11[1]}, ${t11[2]} ${t11[3]}, ${t11[4]} ${t11[5]} `;
                    break;
                case "lineTo":
                    e3 += `L${t11[0]} ${t11[1]} `;
            }
        }
        return e3.trim();
    }
    toPaths(t) {
        const e3 = t.sets || [], s3 = t.options || this.defaultOptions, n4 = [];
        for (const t11 of e3){
            let e4 = null;
            switch(t11.type){
                case "path":
                    e4 = {
                        d: this.opsToPath(t11),
                        stroke: s3.stroke,
                        strokeWidth: s3.strokeWidth,
                        fill: "none"
                    };
                    break;
                case "fillPath":
                    e4 = {
                        d: this.opsToPath(t11),
                        stroke: "none",
                        strokeWidth: 0,
                        fill: s3.fill || "none"
                    };
                    break;
                case "fillSketch":
                    e4 = this.fillSketch(t11, s3);
            }
            e4 && n4.push(e4);
        }
        return n4;
    }
    fillSketch(t, e) {
        let s3 = e.fillWeight;
        return s3 < 0 && (s3 = e.strokeWidth / 2), {
            d: this.opsToPath(t),
            stroke: e.fill || "none",
            strokeWidth: s3,
            fill: "none"
        };
    }
}
class Y {
    constructor(t11, e3){
        this.canvas = t11, this.ctx = this.canvas.getContext("2d"), this.gen = new U(e3);
    }
    draw(t) {
        const e4 = t.sets || [], s3 = t.options || this.getDefaultOptions(), n4 = this.ctx;
        for (const o3 of e4)switch(o3.type){
            case "path":
                n4.save(), n4.strokeStyle = "none" === s3.stroke ? "transparent" : s3.stroke, n4.lineWidth = s3.strokeWidth, s3.strokeLineDash && n4.setLineDash(s3.strokeLineDash), s3.strokeLineDashOffset && (n4.lineDashOffset = s3.strokeLineDashOffset), this._drawToContext(n4, o3), n4.restore();
                break;
            case "fillPath":
                n4.save(), n4.fillStyle = s3.fill || "";
                const e4 = "curve" === t.shape || "polygon" === t.shape ? "evenodd" : "nonzero";
                this._drawToContext(n4, o3, e4), n4.restore();
                break;
            case "fillSketch":
                this.fillSketch(n4, o3, s3);
        }
    }
    fillSketch(t, e, s) {
        let n4 = s.fillWeight;
        n4 < 0 && (n4 = s.strokeWidth / 2), t.save(), s.fillLineDash && t.setLineDash(s.fillLineDash), s.fillLineDashOffset && (t.lineDashOffset = s.fillLineDashOffset), t.strokeStyle = s.fill || "", t.lineWidth = n4, this._drawToContext(t, e), t.restore();
    }
    _drawToContext(t, e, s = "nonzero") {
        t.beginPath();
        for (const s3 of e.ops){
            const e4 = s3.data;
            switch(s3.op){
                case "move":
                    t.moveTo(e4[0], e4[1]);
                    break;
                case "bcurveTo":
                    t.bezierCurveTo(e4[0], e4[1], e4[2], e4[3], e4[4], e4[5]);
                    break;
                case "lineTo":
                    t.lineTo(e4[0], e4[1]);
            }
        }
        "fillPath" === e.type ? t.fill(s) : t.stroke();
    }
    get generator() {
        return this.gen;
    }
    getDefaultOptions() {
        return this.gen.defaultOptions;
    }
    line(t, e, s, n, o) {
        const a3 = this.gen.line(t, e, s, n, o);
        return this.draw(a3), a3;
    }
    rectangle(t, e, s, n, o) {
        const a3 = this.gen.rectangle(t, e, s, n, o);
        return this.draw(a3), a3;
    }
    ellipse(t, e, s, n, o) {
        const a3 = this.gen.ellipse(t, e, s, n, o);
        return this.draw(a3), a3;
    }
    circle(t, e, s, n) {
        const o3 = this.gen.circle(t, e, s, n);
        return this.draw(o3), o3;
    }
    linearPath(t, e) {
        const s3 = this.gen.linearPath(t, e);
        return this.draw(s3), s3;
    }
    polygon(t, e) {
        const s3 = this.gen.polygon(t, e);
        return this.draw(s3), s3;
    }
    arc(t, e, s, n, o, a, r = !1, h) {
        const i3 = this.gen.arc(t, e, s, n, o, a, r, h);
        return this.draw(i3), i3;
    }
    curve(t, e) {
        const s3 = this.gen.curve(t, e);
        return this.draw(s3), s3;
    }
    path(t, e) {
        const s3 = this.gen.path(t, e);
        return this.draw(s3), s3;
    }
}
class et {
    constructor(t12, e4){
        this.svg = t12, this.gen = new U(e4);
    }
    draw(t) {
        const e5 = t.sets || [], s3 = t.options || this.getDefaultOptions(), n4 = this.svg.ownerDocument || window.document, o3 = n4.createElementNS("http://www.w3.org/2000/svg", "g");
        for (const a3 of e5){
            let e6 = null;
            switch(a3.type){
                case "path":
                    e6 = n4.createElementNS("http://www.w3.org/2000/svg", "path"), e6.setAttribute("d", this.opsToPath(a3)), e6.setAttribute("stroke", s3.stroke), e6.setAttribute("stroke-width", s3.strokeWidth + ""), e6.setAttribute("fill", "none"), s3.strokeLineDash && e6.setAttribute("stroke-dasharray", s3.strokeLineDash.join(" ").trim()), s3.strokeLineDashOffset && e6.setAttribute("stroke-dashoffset", "" + s3.strokeLineDashOffset);
                    break;
                case "fillPath":
                    e6 = n4.createElementNS("http://www.w3.org/2000/svg", "path"), e6.setAttribute("d", this.opsToPath(a3)), e6.setAttribute("stroke", "none"), e6.setAttribute("stroke-width", "0"), e6.setAttribute("fill", s3.fill || ""), "curve" !== t.shape && "polygon" !== t.shape || e6.setAttribute("fill-rule", "evenodd");
                    break;
                case "fillSketch":
                    e6 = this.fillSketch(n4, a3, s3);
            }
            e6 && o3.appendChild(e6);
        }
        return o3;
    }
    fillSketch(t, e, s) {
        let n4 = s.fillWeight;
        n4 < 0 && (n4 = s.strokeWidth / 2);
        const o3 = t.createElementNS("http://www.w3.org/2000/svg", "path");
        return o3.setAttribute("d", this.opsToPath(e)), o3.setAttribute("stroke", s.fill || ""), o3.setAttribute("stroke-width", n4 + ""), o3.setAttribute("fill", "none"), s.fillLineDash && o3.setAttribute("stroke-dasharray", s.fillLineDash.join(" ").trim()), s.fillLineDashOffset && o3.setAttribute("stroke-dashoffset", "" + s.fillLineDashOffset), o3;
    }
    get generator() {
        return this.gen;
    }
    getDefaultOptions() {
        return this.gen.defaultOptions;
    }
    opsToPath(t) {
        return this.gen.opsToPath(t);
    }
    line(t, e, s, n, o) {
        const a3 = this.gen.line(t, e, s, n, o);
        return this.draw(a3);
    }
    rectangle(t, e, s, n, o) {
        const a3 = this.gen.rectangle(t, e, s, n, o);
        return this.draw(a3);
    }
    ellipse(t, e, s, n, o) {
        const a3 = this.gen.ellipse(t, e, s, n, o);
        return this.draw(a3);
    }
    circle(t, e, s, n) {
        const o3 = this.gen.circle(t, e, s, n);
        return this.draw(o3);
    }
    linearPath(t, e) {
        const s3 = this.gen.linearPath(t, e);
        return this.draw(s3);
    }
    polygon(t, e) {
        const s3 = this.gen.polygon(t, e);
        return this.draw(s3);
    }
    arc(t, e, s, n, o, a, r = !1, h) {
        const i3 = this.gen.arc(t, e, s, n, o, a, r, h);
        return this.draw(i3);
    }
    curve(t, e) {
        const s3 = this.gen.curve(t, e);
        return this.draw(s3);
    }
    path(t, e) {
        const s3 = this.gen.path(t, e);
        return this.draw(s3);
    }
}
const rough = {
    canvas: (t13, e5)=>new Y(t13, e5)
    ,
    svg: (t13, e5)=>new et(t13, e5)
    ,
    generator: (t13)=>new U(t13)
    ,
    newSeed: ()=>U.newSeed()
};
var __decorate1 = this && this.__decorate || function(decorators, target, key, desc) {
    var c2 = arguments.length, r3 = c2 < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d2;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r3 = Reflect.decorate(decorators, target, key, desc);
    else for(var i3 = decorators.length - 1; i3 >= 0; i3--)if (d2 = decorators[i3]) r3 = (c2 < 3 ? d2(r3) : c2 > 3 ? d2(target, key, r3) : d2(target, key)) || r3;
    return (c2 > 3 && r3 && Object.defineProperty(target, key, r3), r3);
};
var __metadata1 = this && this.__metadata || function(k2, v2) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k2, v2);
};
let WiredButton = class WiredButton extends WiredBase {
    constructor(){
        super();
        this.elevation = 1;
        this.disabled = false;
        if (window.ResizeObserver) {
            this.resizeObserver = new window.ResizeObserver(()=>{
                if (this.svg) {
                    this.wiredRender(true);
                }
            });
        }
    }
    static get styles() {
        return [
            BaseCSS,
            css`\n        :host {\n          display: inline-block;\n          font-size: 14px;\n        }\n        path {\n          transition: transform 0.05s ease;\n        }\n        button {\n          position: relative;\n          user-select: none;\n          border: none;\n          background: none;\n          font-family: inherit;\n          font-size: inherit;\n          cursor: pointer;\n          letter-spacing: 1.25px;\n          text-transform: uppercase;\n          text-align: center;\n          padding: 10px;\n          color: inherit;\n          outline: none;\n        }\n        button[disabled] {\n          opacity: 0.6 !important;\n          background: rgba(0, 0, 0, 0.07);\n          cursor: default;\n          pointer-events: none;\n        }\n        button:active path {\n          transform: scale(0.97) translate(1.5%, 1.5%);\n        }\n        button:focus path {\n          stroke-width: 1.5;\n        }\n        button::-moz-focus-inner {\n          border: 0;\n        }\n      `
        ];
    }
    render() {
        return html`\n    <button ?disabled="${this.disabled}">\n      <slot @slotchange="${this.wiredRender}"></slot>\n      <div id="overlay">\n        <svg></svg>\n      </div>\n    </button>\n    `;
    }
    focus() {
        if (this.button) {
            this.button.focus();
        } else {
            super.focus();
        }
    }
    canvasSize() {
        if (this.button) {
            const size = this.button.getBoundingClientRect();
            const elev = Math.min(Math.max(1, this.elevation), 5);
            const w2 = size.width + (elev - 1) * 2;
            const h3 = size.height + (elev - 1) * 2;
            return [
                w2,
                h3
            ];
        }
        return this.lastSize;
    }
    draw(svg, size) {
        const elev = Math.min(Math.max(1, this.elevation), 5);
        const s3 = {
            width: size[0] - (elev - 1) * 2,
            height: size[1] - (elev - 1) * 2
        };
        k(svg, 0, 0, s3.width, s3.height, this.seed);
        for(let i3 = 1; i3 < elev; i3++){
            line(svg, i3 * 2, s3.height + i3 * 2, s3.width + i3 * 2, s3.height + i3 * 2, this.seed).style.opacity = `${(75 - i3 * 10) / 100}`;
            line(svg, s3.width + i3 * 2, s3.height + i3 * 2, s3.width + i3 * 2, i3 * 2, this.seed).style.opacity = `${(75 - i3 * 10) / 100}`;
            line(svg, i3 * 2, s3.height + i3 * 2, s3.width + i3 * 2, s3.height + i3 * 2, this.seed).style.opacity = `${(75 - i3 * 10) / 100}`;
            line(svg, s3.width + i3 * 2, s3.height + i3 * 2, s3.width + i3 * 2, i3 * 2, this.seed).style.opacity = `${(75 - i3 * 10) / 100}`;
        }
    }
    updated() {
        super.updated();
        this.attachResizeListener();
    }
    disconnectedCallback() {
        this.detachResizeListener();
    }
    attachResizeListener() {
        if (this.button && this.resizeObserver && this.resizeObserver.observe) {
            this.resizeObserver.observe(this.button);
        }
    }
    detachResizeListener() {
        if (this.button && this.resizeObserver && this.resizeObserver.unobserve) {
            this.resizeObserver.unobserve(this.button);
        }
    }
};
__decorate1([
    property({
        type: Number
    }),
    __metadata1("design:type", Object)
], WiredButton.prototype, "elevation", void 0);
__decorate1([
    property({
        type: Boolean,
        reflect: true
    }),
    __metadata1("design:type", Object)
], WiredButton.prototype, "disabled", void 0);
__decorate1([
    query('button'),
    __metadata1("design:type", HTMLButtonElement)
], WiredButton.prototype, "button", void 0);
WiredButton = __decorate1([
    customElement('wired-button'),
    __metadata1("design:paramtypes", [])
], WiredButton);
var __decorate2 = this && this.__decorate || function(decorators, target, key, desc) {
    var c2 = arguments.length, r3 = c2 < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d2;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r3 = Reflect.decorate(decorators, target, key, desc);
    else for(var i3 = decorators.length - 1; i3 >= 0; i3--)if (d2 = decorators[i3]) r3 = (c2 < 3 ? d2(r3) : c2 > 3 ? d2(target, key, r3) : d2(target, key)) || r3;
    return (c2 > 3 && r3 && Object.defineProperty(target, key, r3), r3);
};
var __metadata2 = this && this.__metadata || function(k2, v2) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k2, v2);
};
let WiredSlider = class WiredSlider extends WiredBase {
    constructor(){
        super(...arguments);
        this.min = 0;
        this.max = 100;
        this.step = 1;
        this.disabled = false;
        this.canvasWidth = 300;
    }
    static get styles() {
        return [
            BaseCSS,
            css`\n      :host {\n        display: inline-block;\n        position: relative;\n        width: 300px;\n        box-sizing: border-box;\n      }\n      :host([disabled]) {\n        opacity: 0.45 !important;\n        cursor: default;\n        pointer-events: none;\n        background: rgba(0, 0, 0, 0.07);\n        border-radius: 5px;\n      }\n      input[type=range] {\n        width: 100%;\n        height: 40px;\n        box-sizing: border-box;\n        margin: 0;\n        -webkit-appearance: none;\n        background: transparent;\n        outline: none;\n        position: relative;\n      }\n      input[type=range]:focus {\n        outline: none;\n      }\n      input[type=range]::-ms-track {\n        width: 100%;\n        cursor: pointer;\n        background: transparent;\n        border-color: transparent;\n        color: transparent;\n      }\n      input[type=range]::-moz-focus-outer {\n        outline: none;\n        border: 0;\n      }\n      input[type=range]::-moz-range-thumb {\n        border-radius: 50px;\n        background: none;\n        cursor: pointer;\n        border: none;\n        margin: 0;\n        height: 20px;\n        width: 20px;\n        line-height: 1;\n      }\n      input[type=range]::-webkit-slider-thumb {\n        -webkit-appearance: none;\n        border-radius: 50px;\n        background: none;\n        cursor: pointer;\n        border: none;\n        height: 20px;\n        width: 20px;\n        margin: 0;\n        line-height: 1;\n      }\n      .knob{\n        fill: var(--wired-slider-knob-color, rgb(51, 103, 214));\n        stroke: var(--wired-slider-knob-color, rgb(51, 103, 214));\n      }\n      .bar {\n        stroke: var(--wired-slider-bar-color, rgb(0, 0, 0));\n      }\n      input:focus + div svg .knob {\n        stroke: var(--wired-slider-knob-outline-color, #000);\n        fill-opacity: 0.8;\n      }\n      `
        ];
    }
    get value() {
        if (this.input) {
            return +this.input.value;
        }
        return this.min;
    }
    set value(v) {
        if (this.input) {
            this.input.value = `${v}`;
        } else {
            this.pendingValue = v;
        }
        this.updateThumbPosition();
    }
    firstUpdated() {
        this.value = this.pendingValue || +(this.getAttribute('value') || this.value || this.min);
        delete this.pendingValue;
    }
    render() {
        return html`\n    <div id="container">\n      <input type="range" \n        min="${this.min}"\n        max="${this.max}"\n        step="${this.step}"\n        ?disabled="${this.disabled}"\n        @input="${this.onInput}">\n      <div id="overlay">\n        <svg></svg>\n      </div>\n    </div>\n    `;
    }
    focus() {
        if (this.input) {
            this.input.focus();
        } else {
            super.focus();
        }
    }
    onInput(e) {
        e.stopPropagation();
        this.updateThumbPosition();
        if (this.input) {
            fire(this, 'change', {
                value: +this.input.value
            });
        }
    }
    wiredRender(force = false) {
        super.wiredRender(force);
        this.updateThumbPosition();
    }
    canvasSize() {
        const s3 = this.getBoundingClientRect();
        return [
            s3.width,
            s3.height
        ];
    }
    draw(svg, size) {
        this.canvasWidth = size[0];
        const midY = Math.round(size[1] / 2);
        O(svg, 0, midY, size[0], midY, this.seed).classList.add('bar');
        this.knob = $1(svg, 10, midY, 20, 20, this.seed);
        this.knob.classList.add('knob');
    }
    updateThumbPosition() {
        if (this.input) {
            const value = +this.input.value;
            const delta = Math.max(this.step, this.max - this.min);
            const pct = (value - this.min) / delta;
            if (this.knob) {
                this.knob.style.transform = `translateX(${pct * (this.canvasWidth - 20)}px)`;
            }
        }
    }
};
__decorate2([
    property({
        type: Number
    }),
    __metadata2("design:type", Object)
], WiredSlider.prototype, "min", void 0);
__decorate2([
    property({
        type: Number
    }),
    __metadata2("design:type", Object)
], WiredSlider.prototype, "max", void 0);
__decorate2([
    property({
        type: Number
    }),
    __metadata2("design:type", Object)
], WiredSlider.prototype, "step", void 0);
__decorate2([
    property({
        type: Boolean,
        reflect: true
    }),
    __metadata2("design:type", Object)
], WiredSlider.prototype, "disabled", void 0);
__decorate2([
    query('input'),
    __metadata2("design:type", HTMLInputElement)
], WiredSlider.prototype, "input", void 0);
WiredSlider = __decorate2([
    customElement('wired-slider')
], WiredSlider);
var __decorate3 = this && this.__decorate || function(decorators, target, key, desc) {
    var c2 = arguments.length, r3 = c2 < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d2;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r3 = Reflect.decorate(decorators, target, key, desc);
    else for(var i3 = decorators.length - 1; i3 >= 0; i3--)if (d2 = decorators[i3]) r3 = (c2 < 3 ? d2(r3) : c2 > 3 ? d2(target, key, r3) : d2(target, key)) || r3;
    return (c2 > 3 && r3 && Object.defineProperty(target, key, r3), r3);
};
var __metadata3 = this && this.__metadata || function(k2, v3) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k2, v3);
};
let WiredCombo = class WiredCombo extends LitElement {
    constructor(){
        super(...arguments);
        this.disabled = false;
        this.seed = randomSeed();
        this.cardShowing = false;
        this.itemNodes = [];
    }
    static get styles() {
        return css`\n      :host {\n        display: inline-block;\n        font-family: inherit;\n        position: relative;\n        outline: none;\n        opacity: 0;\n      }\n    \n      :host(.wired-disabled) {\n        opacity: 0.5 !important;\n        cursor: default;\n        pointer-events: none;\n        background: rgba(0, 0, 0, 0.02);\n      }\n      \n      :host(.wired-rendered) {\n        opacity: 1;\n      }\n  \n      :host(:focus) path {\n        stroke-width: 1.5;\n      }\n    \n      #container {\n        white-space: nowrap;\n        position: relative;\n      }\n    \n      .inline {\n        display: inline-block;\n        vertical-align: top\n      }\n    \n      #textPanel {\n        min-width: 90px;\n        min-height: 18px;\n        padding: 8px;\n      }\n    \n      #dropPanel {\n        width: 34px;\n        cursor: pointer;\n      }\n    \n      .overlay {\n        position: absolute;\n        top: 0;\n        left: 0;\n        right: 0;\n        bottom: 0;\n        pointer-events: none;\n      }\n    \n      svg {\n        display: block;\n      }\n    \n      path {\n        stroke: currentColor;\n        stroke-width: 0.7;\n        fill: transparent;\n      }\n    \n      #card {\n        display: block;\n        position: absolute;\n        background: var(--wired-combo-popup-bg, white);\n        z-index: 1;\n        box-shadow: 1px 5px 15px -6px rgba(0, 0, 0, 0.8);\n        padding: 8px;\n      }\n  \n      ::slotted(wired-item) {\n        display: block;\n      }\n    `;
    }
    render() {
        return html`\n    <div id="container" @click="${this.onCombo}">\n      <div id="textPanel" class="inline">\n        <span>${this.value && this.value.text}</span>\n      </div>\n      <div id="dropPanel" class="inline"></div>\n      <div class="overlay">\n        <svg></svg>\n      </div>\n    </div>\n    <wired-card id="card" tabindex="-1" role="listbox" @mousedown="${this.onItemClick}" @touchstart="${this.onItemClick}" style="display: none;">\n      <slot id="slot"></slot>\n    </wired-card>\n    `;
    }
    refreshDisabledState() {
        if (this.disabled) {
            this.classList.add('wired-disabled');
        } else {
            this.classList.remove('wired-disabled');
        }
        this.tabIndex = this.disabled ? -1 : +(this.getAttribute('tabindex') || 0);
    }
    firstUpdated() {
        this.setAttribute('role', 'combobox');
        this.setAttribute('aria-haspopup', 'listbox');
        this.refreshSelection();
        this.addEventListener('blur', ()=>{
            if (this.cardShowing) {
                this.setCardShowing(false);
            }
        });
        this.addEventListener('keydown', (event)=>{
            switch(event.keyCode){
                case 37:
                case 38:
                    event.preventDefault();
                    this.selectPrevious();
                    break;
                case 39:
                case 40:
                    event.preventDefault();
                    this.selectNext();
                    break;
                case 27:
                    event.preventDefault();
                    if (this.cardShowing) {
                        this.setCardShowing(false);
                    }
                    break;
                case 13:
                    event.preventDefault();
                    this.setCardShowing(!this.cardShowing);
                    break;
                case 32:
                    event.preventDefault();
                    if (!this.cardShowing) {
                        this.setCardShowing(true);
                    }
                    break;
            }
        });
    }
    updated(changed) {
        if (changed.has('disabled')) {
            this.refreshDisabledState();
        }
        const svg = this.svg;
        while(svg.hasChildNodes()){
            svg.removeChild(svg.lastChild);
        }
        const s3 = this.shadowRoot.getElementById('container').getBoundingClientRect();
        svg.setAttribute('width', `${s3.width}`);
        svg.setAttribute('height', `${s3.height}`);
        const textBounds = this.shadowRoot.getElementById('textPanel').getBoundingClientRect();
        this.shadowRoot.getElementById('dropPanel').style.minHeight = textBounds.height + 'px';
        k(svg, 0, 0, textBounds.width, textBounds.height, this.seed);
        const dropx = textBounds.width - 4;
        k(svg, dropx, 0, 34, textBounds.height, this.seed);
        const dropOffset = Math.max(0, Math.abs((textBounds.height - 24) / 2));
        const poly = T1(svg, [
            [
                dropx + 8,
                5 + dropOffset
            ],
            [
                dropx + 26,
                5 + dropOffset
            ],
            [
                dropx + 17,
                dropOffset + Math.min(textBounds.height, 18)
            ]
        ], this.seed);
        poly.style.fill = 'currentColor';
        poly.style.pointerEvents = this.disabled ? 'none' : 'auto';
        poly.style.cursor = 'pointer';
        this.classList.add('wired-rendered');
        this.setAttribute('aria-expanded', `${this.cardShowing}`);
        if (!this.itemNodes.length) {
            this.itemNodes = [];
            const nodes = this.shadowRoot.getElementById('slot').assignedNodes();
            if (nodes && nodes.length) {
                for(let i3 = 0; i3 < nodes.length; i3++){
                    const element6 = nodes[i3];
                    if (element6.tagName === 'WIRED-ITEM') {
                        element6.setAttribute('role', 'option');
                        this.itemNodes.push(element6);
                    }
                }
            }
        }
    }
    refreshSelection() {
        if (this.lastSelectedItem) {
            this.lastSelectedItem.selected = false;
            this.lastSelectedItem.removeAttribute('aria-selected');
        }
        const slot = this.shadowRoot.getElementById('slot');
        const nodes = slot.assignedNodes();
        if (nodes) {
            let selectedItem = null;
            for(let i3 = 0; i3 < nodes.length; i3++){
                const element6 = nodes[i3];
                if (element6.tagName === 'WIRED-ITEM') {
                    const value = element6.value || element6.getAttribute('value') || '';
                    if (this.selected && value === this.selected) {
                        selectedItem = element6;
                        break;
                    }
                }
            }
            this.lastSelectedItem = selectedItem || undefined;
            if (this.lastSelectedItem) {
                this.lastSelectedItem.selected = true;
                this.lastSelectedItem.setAttribute('aria-selected', 'true');
            }
            if (selectedItem) {
                this.value = {
                    value: selectedItem.value || '',
                    text: selectedItem.textContent || ''
                };
            } else {
                this.value = undefined;
            }
        }
    }
    setCardShowing(showing) {
        if (this.card) {
            this.cardShowing = showing;
            this.card.style.display = showing ? '' : 'none';
            if (showing) {
                setTimeout(()=>{
                    const nodes = this.shadowRoot.getElementById('slot').assignedNodes().filter((d2)=>{
                        return d2.nodeType === Node.ELEMENT_NODE;
                    });
                    nodes.forEach((n4)=>{
                        const e5 = n4;
                        if (n4.requestUpdate) {
                            n4.requestUpdate();
                        }
                    });
                }, 10);
            }
            this.setAttribute('aria-expanded', `${this.cardShowing}`);
        }
    }
    onItemClick(event) {
        event.stopPropagation();
        this.selected = event.target.value;
        this.refreshSelection();
        this.fireSelected();
        setTimeout(()=>{
            this.setCardShowing(false);
        });
    }
    fireSelected() {
        fire(this, 'selected', {
            selected: this.selected
        });
    }
    selectPrevious() {
        const list = this.itemNodes;
        if (list.length) {
            let index1 = -1;
            for(let i3 = 0; i3 < list.length; i3++){
                if (list[i3] === this.lastSelectedItem) {
                    index1 = i3;
                    break;
                }
            }
            if (index1 < 0) {
                index1 = 0;
            } else if (index1 === 0) {
                index1 = list.length - 1;
            } else {
                index1--;
            }
            this.selected = list[index1].value || '';
            this.refreshSelection();
            this.fireSelected();
        }
    }
    selectNext() {
        const list = this.itemNodes;
        if (list.length) {
            let index1 = -1;
            for(let i3 = 0; i3 < list.length; i3++){
                if (list[i3] === this.lastSelectedItem) {
                    index1 = i3;
                    break;
                }
            }
            if (index1 < 0) {
                index1 = 0;
            } else if (index1 >= list.length - 1) {
                index1 = 0;
            } else {
                index1++;
            }
            this.selected = list[index1].value || '';
            this.refreshSelection();
            this.fireSelected();
        }
    }
    onCombo(event) {
        event.stopPropagation();
        this.setCardShowing(!this.cardShowing);
    }
};
__decorate3([
    property({
        type: Object
    }),
    __metadata3("design:type", Object)
], WiredCombo.prototype, "value", void 0);
__decorate3([
    property({
        type: String,
        reflect: true
    }),
    __metadata3("design:type", String)
], WiredCombo.prototype, "selected", void 0);
__decorate3([
    property({
        type: Boolean,
        reflect: true
    }),
    __metadata3("design:type", Object)
], WiredCombo.prototype, "disabled", void 0);
__decorate3([
    query('svg'),
    __metadata3("design:type", SVGSVGElement)
], WiredCombo.prototype, "svg", void 0);
__decorate3([
    query('#card'),
    __metadata3("design:type", HTMLDivElement)
], WiredCombo.prototype, "card", void 0);
WiredCombo = __decorate3([
    customElement('wired-combo')
], WiredCombo);
var __decorate4 = this && this.__decorate || function(decorators, target, key, desc) {
    var c2 = arguments.length, r3 = c2 < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d2;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r3 = Reflect.decorate(decorators, target, key, desc);
    else for(var i3 = decorators.length - 1; i3 >= 0; i3--)if (d2 = decorators[i3]) r3 = (c2 < 3 ? d2(r3) : c2 > 3 ? d2(target, key, r3) : d2(target, key)) || r3;
    return (c2 > 3 && r3 && Object.defineProperty(target, key, r3), r3);
};
var __metadata4 = this && this.__metadata || function(k2, v3) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k2, v3);
};
let WiredItem = class WiredItem extends WiredBase {
    constructor(){
        super(...arguments);
        this.value = '';
        this.name = '';
        this.selected = false;
    }
    static get styles() {
        return [
            BaseCSS,
            css`\n      :host {\n        display: inline-block;\n        font-size: 14px;\n        text-align: left;\n      }\n      button {\n        cursor: pointer;\n        outline: none;\n        overflow: hidden;\n        color: inherit;\n        user-select: none;\n        position: relative;\n        font-family: inherit;\n        text-align: inherit;\n        font-size: inherit;\n        letter-spacing: 1.25px;\n        padding: 1px 10px;\n        min-height: 36px;\n        text-transform: inherit;\n        background: none;\n        border: none;\n        transition: background-color 0.3s ease, color 0.3s ease;\n        width: 100%;\n        box-sizing: border-box;\n        white-space: nowrap;\n      }\n      button.selected {\n        color: var(--wired-item-selected-color, #fff);\n      }\n      button::before {\n        content: '';\n        position: absolute;\n        top: 0;\n        left: 0;\n        width: 100%;\n        height: 100%;\n        background: currentColor;\n        opacity: 0;\n      }\n      button span {\n        display: inline-block;\n        transition: transform 0.2s ease;\n        position: relative;\n      }\n      button:active span {\n        transform: scale(1.02);\n      }\n      #overlay {\n        display: none;\n      }\n      button.selected #overlay {\n        display: block;\n      }\n      svg path {\n        stroke: var(--wired-item-selected-bg, #000);\n        stroke-width: 2.75;\n        fill: transparent;\n        transition: transform 0.05s ease;\n      }\n      @media (hover: hover) {\n        button:hover::before {\n          opacity: 0.05;\n        }\n      }\n      `
        ];
    }
    render() {
        return html`\n    <button class="${this.selected ? 'selected' : ''}">\n      <div id="overlay"><svg></svg></div>\n      <span><slot></slot></span>\n    </button>`;
    }
    canvasSize() {
        const s3 = this.getBoundingClientRect();
        return [
            s3.width,
            s3.height
        ];
    }
    draw(svg, size) {
        const g2 = E1([
            [
                0,
                0
            ],
            [
                size[0],
                0
            ],
            [
                size[0],
                size[1]
            ],
            [
                0,
                size[1]
            ]
        ], this.seed);
        svg.appendChild(g2);
    }
};
__decorate4([
    property(),
    __metadata4("design:type", Object)
], WiredItem.prototype, "value", void 0);
__decorate4([
    property(),
    __metadata4("design:type", Object)
], WiredItem.prototype, "name", void 0);
__decorate4([
    property({
        type: Boolean
    }),
    __metadata4("design:type", Object)
], WiredItem.prototype, "selected", void 0);
WiredItem = __decorate4([
    customElement('wired-item')
], WiredItem);
var __decorate5 = this && this.__decorate || function(decorators, target, key, desc) {
    var c2 = arguments.length, r3 = c2 < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d2;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r3 = Reflect.decorate(decorators, target, key, desc);
    else for(var i3 = decorators.length - 1; i3 >= 0; i3--)if (d2 = decorators[i3]) r3 = (c2 < 3 ? d2(r3) : c2 > 3 ? d2(target, key, r3) : d2(target, key)) || r3;
    return (c2 > 3 && r3 && Object.defineProperty(target, key, r3), r3);
};
var __metadata5 = this && this.__metadata || function(k2, v3) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k2, v3);
};
let WiredCard = class WiredCard extends WiredBase {
    constructor(){
        super();
        this.elevation = 1;
        if (window.ResizeObserver) {
            this.resizeObserver = new window.ResizeObserver(()=>{
                if (this.svg) {
                    this.wiredRender();
                }
            });
        }
    }
    static get styles() {
        return [
            BaseCSS,
            css`\n        :host {\n          display: inline-block;\n          position: relative;\n          padding: 10px;\n        }\n        path.cardFill {\n          stroke-width: 3.5;\n          stroke: var(--wired-card-background-fill);\n        }\n        path {\n          stroke: var(--wired-card-background-fill, currentColor);\n        }\n      `
        ];
    }
    render() {
        return html`\n    <div id="overlay"><svg></svg></div>\n    <div style="position: relative;">\n      <slot @slotchange="${this.wiredRender}"></slot>\n    </div>\n    `;
    }
    updated(changed) {
        const force = changed.has('fill');
        this.wiredRender(force);
        this.attachResizeListener();
    }
    disconnectedCallback() {
        this.detachResizeListener();
    }
    attachResizeListener() {
        if (this.resizeObserver && this.resizeObserver.observe) {
            this.resizeObserver.observe(this);
        } else if (!this.windowResizeHandler) {
            this.windowResizeHandler = ()=>this.wiredRender()
            ;
            window.addEventListener('resize', this.windowResizeHandler, {
                passive: true
            });
        }
    }
    detachResizeListener() {
        if (this.resizeObserver && this.resizeObserver.unobserve) {
            this.resizeObserver.unobserve(this);
        }
        if (this.windowResizeHandler) {
            window.removeEventListener('resize', this.windowResizeHandler);
        }
    }
    canvasSize() {
        const s3 = this.getBoundingClientRect();
        const elev = Math.min(Math.max(1, this.elevation), 5);
        const w2 = s3.width + (elev - 1) * 2;
        const h3 = s3.height + (elev - 1) * 2;
        return [
            w2,
            h3
        ];
    }
    draw(svg, size) {
        const elev = Math.min(Math.max(1, this.elevation), 5);
        const s3 = {
            width: size[0] - (elev - 1) * 2,
            height: size[1] - (elev - 1) * 2
        };
        if (this.fill && this.fill.trim()) {
            const fillNode = E1([
                [
                    2,
                    2
                ],
                [
                    s3.width - 4,
                    2
                ],
                [
                    s3.width - 2,
                    s3.height - 4
                ],
                [
                    2,
                    s3.height - 4
                ]
            ], this.seed);
            fillNode.classList.add('cardFill');
            svg.style.setProperty('--wired-card-background-fill', this.fill.trim());
            svg.appendChild(fillNode);
        }
        k(svg, 2, 2, s3.width - 4, s3.height - 4, this.seed);
        for(let i3 = 1; i3 < elev; i3++){
            line(svg, i3 * 2, s3.height - 4 + i3 * 2, s3.width - 4 + i3 * 2, s3.height - 4 + i3 * 2, this.seed).style.opacity = `${(85 - i3 * 10) / 100}`;
            line(svg, s3.width - 4 + i3 * 2, s3.height - 4 + i3 * 2, s3.width - 4 + i3 * 2, i3 * 2, this.seed).style.opacity = `${(85 - i3 * 10) / 100}`;
            line(svg, i3 * 2, s3.height - 4 + i3 * 2, s3.width - 4 + i3 * 2, s3.height - 4 + i3 * 2, this.seed).style.opacity = `${(85 - i3 * 10) / 100}`;
            line(svg, s3.width - 4 + i3 * 2, s3.height - 4 + i3 * 2, s3.width - 4 + i3 * 2, i3 * 2, this.seed).style.opacity = `${(85 - i3 * 10) / 100}`;
        }
    }
};
__decorate5([
    property({
        type: Number
    }),
    __metadata5("design:type", Object)
], WiredCard.prototype, "elevation", void 0);
__decorate5([
    property({
        type: String
    }),
    __metadata5("design:type", String)
], WiredCard.prototype, "fill", void 0);
WiredCard = __decorate5([
    customElement('wired-card'),
    __metadata5("design:paramtypes", [])
], WiredCard);
export { Port, rough, LitElement, html1 as html, css1 as css };
