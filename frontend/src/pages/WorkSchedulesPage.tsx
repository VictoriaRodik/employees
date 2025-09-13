import WorkScheduleList from "../components/workScheduleComponents/WorkScheduleList";
import BasePage from "./BasePage";

const WorkSchedulesPage = () => {
  return (
    <BasePage title="Графіки роботи">
      <WorkScheduleList />
    </BasePage>
  );
};

export default WorkSchedulesPage;
