export default function Notification({ date, time, onChangeDate, onChangeTime }) {
  return (
    <div className="flex gap-2">
      <input
        className="border border-gray-300 p-2 rounded-lg"
        type="date"
        name="notification-date"
        id="notification-date"
        defaultValue={date}
        onChange={onChangeDate}
      />
      <input
        className="border border-gray-300 p-2 rounded-lg"
        type="time"
        name="notification-time"
        id="notification-time"
        defaultValue={time}
        onChange={onChangeTime}
      />
    </div>
  );
}