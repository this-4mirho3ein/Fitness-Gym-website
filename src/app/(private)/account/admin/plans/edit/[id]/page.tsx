import PageTitle from "@/components/ui/page-title";
import PlanForm from "../../components/plan-form";

const EditPlanPage = () => {
  //temprory
  let initialValues = {};
  return (
    <div>
      <PageTitle title="Edit Plan" />
      <PlanForm formType="edit" initialValues={initialValues} />
    </div>
  );
};

export default EditPlanPage;
