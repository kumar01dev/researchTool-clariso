import { CalendarDays, Video, CalendarCheck  } from "lucide-react";

const demoEvents  = [
  {
    date: "Today",
    day: "Jul 6",
    title: "Team standup",
    time: "9 AM",
    location: "Office",
    action: "Join and take notes",
  },
  {
    date: "Mon",
    day: "Jul 7",
    title: "Project check-in",
    time: "10 AM",
    location: "Office",
  },
];

export default function UpcomingEvents() {
   return (
    <div className="w-full max-w-3xl mx-auto space-y-2">
      {/* Small heading row */}
      <div className="flex items-center gap-1 text-xs text-gray-300 uppercase tracking-wide">
        <CalendarCheck className="w-3.5 h-3.5" />
        Upcoming events
      </div>

      {/* Main card */}
      <div className="bg-[#1e1e1e] rounded-xl overflow-hidden shadow lg:flex">
        {/* -------- Left half -------- */}
        <div className="lg:w-1/2 p-6 space-y-3 border-b lg:border-b-0 lg:border-r border-gray-700">
          <CalendarDays className="w-7 h-7 text-white/70" />
          <h3 className="text-lg font-semibold leading-tight text-white">
            Connect AI Meeting Notes
            <br />
            with your Calendar events
          </h3>
          <p className="text-sm text-white/70">
            Join calls, transcribe audio, and summarize meetings all in Notion.
          </p>
          <button className="text-sm text-blue-500 hover:underline mt-1">
            Connect&nbsp;Notion&nbsp;Calendar
          </button>
        </div>

        {/* -------- Right half -------- */}
        <div className="lg:w-1/2 p-6 space-y-6 flex flex-col justify-center">
          {demoEvents.map((e, i) => (
            <div key={i} className="flex gap-4">
              {/* timeline bar */}
              <div className="flex flex-col items-center">
                {/* top ‑ hide bar for first item */}
                {i !== 0 && <span className="flex-1 w-px bg-gray-600" />}
                {/* dot / bar segment */}
                <span className="w-px h-6 bg-gray-600" />
                {/* bottom bar */}
                {i !== demoEvents.length - 1 && (
                  <span className="flex-1 w-px bg-gray-600" />
                )}
              </div>

              {/* event content */}
              <div className="space-y-0.5">
                <div className="text-xs text-white/60">
                  {e.label} · {e.day}
                </div>
                <div className="font-medium text-white">{e.title}</div>
                <div className="text-sm text-white/50">{e.meta}</div>

                {e.cta && (
                  <button className="mt-1 inline-flex items-center gap-1 text-xs bg-gray-800 hover:bg-gray-700 px-2.5 py-1 rounded-md">
                    <Video className="w-3.5 h-3.5" />
                    {e.cta}
                  </button>
                )}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}