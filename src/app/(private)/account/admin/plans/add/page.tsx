import PageTitle from "@/components/ui/page-title";
import PlanForm from "../components/plan-form";

const AddPlanPage = () => {
  return (
    <div>
      <PageTitle title="Add Plan" />
      <PlanForm formType="add" initialValues={null} />
    </div>
  );
};

export default AddPlanPage;
