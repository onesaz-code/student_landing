import type { ReactNode } from "react";
import "./att.css";
import { DemoWindow } from "./DemoWindow";

const MONO = "font-[family-name:var(--font-mono)]";
const SKY = "#0284C7";
const PILL = `${MONO} inline-flex items-center gap-[5px] whitespace-nowrap rounded-full px-2 py-1 text-[10px] font-semibold tracking-[.04em]`;
const CARD = "rounded-xl border border-[#EDF0F5] bg-white";

const STUDENTS = [
  { name: "Aarav", present: true },
  { name: "Diya", present: true },
  { name: "Ishaan", present: false },
  { name: "Kavya", present: true },
  { name: "Riya", present: false },
  { name: "Vihaan", present: true },
];

const ALERTS = STUDENTS.filter((s) => !s.present).map((s) => s.name);

const BARS = [
  { label: "Students", value: "94.6%", width: "95%" },
  { label: "Staff", value: "97.1%", width: "97%" },
];

function Step({ n, children }: { n: number; children: ReactNode }) {
  return (
    <span className="flex items-center gap-2 text-[13px] font-semibold text-[#0F1729]">
      <span
        className="inline-flex h-5 w-5 shrink-0 items-center justify-center rounded-[10px] text-[11px] font-bold text-white"
        style={{ background: SKY }}
      >
        {n}
      </span>
      {children}
    </span>
  );
}

export default function AttendanceDemo() {
  return (
    <div className="att-root">
      <DemoWindow
        title="ONESAZ Attendance"
        meta="Teacher view"
        bodyClassName="flex flex-col gap-4"
      >
        <p className="sr-only">
          Animated example: a teacher marks the Class 8B register (4 of 6
          present), parents of the two absent students get an automatic alert,
          and the whole-school attendance for today fills in (students 94.6%,
          staff 97.1%) with the monthly report ready.
        </p>

        <div
          aria-hidden
          className="att-grid grid grid-cols-[minmax(0,1.15fr)_minmax(0,1fr)] items-start gap-3"
        >
          {/* 1. Register */}
          <div className="flex min-w-0 flex-col gap-2.5">
            <span className="flex flex-wrap items-center justify-between gap-2">
              <Step n={1}>Class 8B · Today</Step>
              <span className="inline-grid shrink-0 justify-items-end">
                <span className="att-c0 [grid-area:1/1]">
                  <span className={`${PILL} bg-[#E0F2FE] text-[#0284C7]`}>
                    <span
                      className="att-livedot h-1.5 w-1.5 rounded-[3px]"
                      style={{ background: SKY }}
                    />
                    Marking…
                  </span>
                </span>
                <span className="att-c1 [grid-area:1/1]">
                  <span className={`${PILL} bg-[#E7F5EE] text-[#1F7A4F]`}>
                    Saved · 4 of 6 present
                  </span>
                </span>
              </span>
            </span>

            <div className={CARD}>
              {STUDENTS.map((s, i) => (
                <div
                  key={s.name}
                  className={`flex items-center gap-2.5 px-3 py-2 ${i < STUDENTS.length - 1 ? "border-b border-[#F0F2F6]" : ""}`}
                >
                  <span className="flex h-[26px] w-[26px] shrink-0 items-center justify-center rounded-[13px] bg-[#F3F4F7] text-[10.5px] font-semibold text-[#5B6478]">
                    {s.name[0]}
                  </span>
                  <span className="min-w-0 grow text-[12.5px] text-[#0F1729]">
                    {s.name}
                  </span>
                  <span className="inline-grid shrink-0 justify-items-end">
                    <span className={`att-q att-q${i} [grid-area:1/1]`}>
                      <span
                        className={`${MONO} rounded-full bg-[#F3F4F7] px-[9px] py-1 text-[10px] font-semibold text-[#98A2B3]`}
                      >
                        —
                      </span>
                    </span>
                    <span className={`att-p${i} [grid-area:1/1]`}>
                      {s.present ? (
                        <span className={`${PILL} bg-[#E7F5EE] text-[#1F7A4F]`}>
                          Present
                        </span>
                      ) : (
                        <span className={`${PILL} bg-[#FEECEB] text-[#B42318]`}>
                          Absent
                        </span>
                      )}
                    </span>
                  </span>
                </div>
              ))}
            </div>
          </div>

          {/* 2. Absence alerts */}
          <div className={`${CARD} flex min-w-0 flex-col gap-2.5 p-3.5`}>
            <Step n={2}>Absence alerts</Step>
            <span className="flex min-h-[120px] flex-col gap-2">
              {ALERTS.map((name, i) => (
                <span
                  key={name}
                  className={`att-m${i} flex flex-col gap-[3px] rounded-[10px_10px_10px_3px] border border-[#C9EED9] bg-[#E7F8EE] px-2.5 py-2`}
                >
                  <span className="text-[11.5px] leading-[1.4] text-[#0F3D24]">
                    {name} was absent today (Class 8B). Please reply if this is
                    expected.
                  </span>
                  <span className="inline-flex items-center gap-[3px] self-end text-[9.5px] text-[#1F9D63]">
                    <svg
                      viewBox="0 0 24 24"
                      width="10"
                      height="10"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="1.75"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    >
                      <path d="m5 12 5 5 9-10" />
                    </svg>
                    Sent to parent · 9:02 am
                  </span>
                </span>
              ))}
            </span>
          </div>
        </div>

        {/* 3. Whole school */}
        <div aria-hidden className={`${CARD} flex flex-col gap-2.5 p-3.5`}>
          <span className="flex flex-wrap items-center justify-between gap-2">
            <Step n={3}>Today, whole school</Step>
            <span className="att-r">
              <span className={`${PILL} bg-[#E7F5EE] text-[#1F7A4F]`}>
                Monthly report ready
              </span>
            </span>
          </span>
          {BARS.map((b, i) => (
            <div key={b.label} className="flex flex-col gap-[5px]">
              <span className="flex justify-between text-[12px] text-[#5B6478]">
                <span>{b.label}</span>
                <b className="text-[#0F1729]">{b.value}</b>
              </span>
              <span className="block h-[7px] overflow-hidden rounded bg-[#EEF0F3]">
                <span
                  className={`att-b${i} block h-[7px] origin-left rounded`}
                  style={{ width: b.width, background: SKY }}
                />
              </span>
            </div>
          ))}
        </div>
      </DemoWindow>
    </div>
  );
}
