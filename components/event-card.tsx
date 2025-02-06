interface EventCardProps {
  id: string;
  title: string;
  date: Date;
  month?: string;
  color: string;
  time: string;
  description?: string;
  progress?: number;
}

export function EventCard({
  id,
  title,
  date,
  color,
  time,
  description,
  progress = 50,
}: EventCardProps) {
  return (
    <div className="flex gap-4 items-start mb-4">
      <div
        className="w-12 h-12 rounded-lg flex flex-col items-center justify-center text-white"
        style={{ backgroundColor: color }}
      >
        <span className="text-xl font-bold">{date.getDate()}</span>
        <span className="text-xs uppercase">
          {date.toLocaleString("default", { month: "short" })}
        </span>
      </div>
      <div className="flex-1">
        <h3 className="font-semibold text-gray-800 mb-1">{title}</h3>
        {description && (
          <p className="text-sm text-gray-500 mb-2">{description}</p>
        )}
        {time && (
          <div className="flex items-center gap-2">
            <div className="flex-1 h-1 bg-gray-200 rounded-full">
              <div
                className="h-full rounded-full bg-blue-500"
                style={{ width: `${progress}%` }}
              />
            </div>
            <span className="text-xs text-gray-500">{time}</span>
          </div>
        )}
      </div>
    </div>
  );
}
