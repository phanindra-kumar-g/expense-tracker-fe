import "./Calender.scss";

const Calender = (props) => {
  const { date } = props;
  const displayDate = new Date(date);
  const month = displayDate.toLocaleString("default", { month: "long" });

  return (
    <div className="calender">
      <div className="date">{displayDate.getDate()}</div>
      <div className="month">{month}</div>
      <div className="year">{displayDate.getFullYear()}</div>
    </div>
  );
};

export default Calender;
