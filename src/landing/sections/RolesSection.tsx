import * as React from 'react'
import { Segmented } from '../components/Segmented'
import { SectionHeader } from '../components/SectionHeader'
import { ROLE_VIEWS } from '../content/home'

type RoleId = (typeof ROLE_VIEWS)[number]['id']

/** "A workspace for everyone": a mock dashboard that changes with the selected role. */
export function RolesSection() {
  const [id, setId] = React.useState<RoleId>('principal')
  const role = ROLE_VIEWS.find((r) => r.id === id)!

  return (
    <section id="roles" className="lp-section lp-section-alt">
      <div className="lp-container flex flex-col items-center gap-10">
        <SectionHeader
          eyebrow="For every role"
          title="A workspace for everyone at your institution."
          lead="Pick a role to see what ONESAZ gives them each day."
        />

        <Segmented
          label="Role"
          options={ROLE_VIEWS.map((r) => ({ id: r.id, label: r.label }))}
          value={id}
          onChange={setId}
          controls="roles-panel"
        />

        <div
          id="roles-panel"
          role="tabpanel"
          key={id}
          className="lp-fade flex w-full max-w-[1000px] flex-col gap-6 rounded-2xl border border-[#E1E4EA] bg-white p-8 shadow-[0_32px_64px_-32px_rgba(15,23,41,.22)] max-[639px]:p-5"
        >
          <div className="flex items-center justify-between gap-4">
            <div className="flex flex-col gap-1">
              <span className="text-[13px] text-[#667085]">{role.greet}</span>
              <h3 className="font-[family-name:var(--font-display)] text-[24px] font-semibold tracking-[-0.02em]">{role.title}</h3>
            </div>
            <span className="shrink-0 rounded-md bg-[color:var(--brand-tint)] px-2.5 py-1.5 font-[family-name:var(--font-mono)] text-[11px] text-[color:var(--brand)]">
              {role.tag}
            </span>
          </div>

          <div className="grid grid-cols-3 gap-3.5 max-[639px]:grid-cols-1 max-[639px]:gap-2.5">
            {role.kpis.map(([label, value]) => (
              <div key={label} className="flex flex-col gap-1.5 rounded-[10px] border border-[color:var(--line)] bg-white p-[18px]">
                <span className="text-[12px] text-[#667085]">{label}</span>
                <span className="text-[15px] font-medium text-[color:var(--ink-900)]">{value}</span>
              </div>
            ))}
          </div>

          <ul className="flex flex-col">
            {role.items.map(([text, tag, dot]) => (
              <li key={text} className="flex items-center gap-3.5 border-t border-[#F1F2F4] py-3.5">
                <span className="h-2 w-2 shrink-0 rounded-full" style={{ background: dot }} />
                <span className="flex-grow text-[14px] font-medium">{text}</span>
                <span className="shrink-0 text-[13px] text-[#667085]">{tag}</span>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </section>
  )
}
