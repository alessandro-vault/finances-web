"use client";
import { useEffect, useState } from "react";

import PlanLoadingList from "@/components/plans/plan-list-loading";
import { Plan } from "@/types/plan";
import PlanItem from "@/components/plans/plan-item";

export default function PlansPage() {
  const [state, setState] = useState({ plans: [], loading: true, error: null });

  useEffect(() => {
    fetch('/api/plans')
      .then(res => res.json())
      .then(({ plans }) => {
        setState({ plans: plans, loading: false, error: null });
      })
      .catch(error => {
        setState({ plans: [], loading: false, error: error });
      })
  }, []);

  if (state.plans.length > 0 && !state.loading) {
    return (
      <div className="h-full transition ease-in-out delay-150 w-full p-10 gap-y-5 xl:w-10/12 grid grid-cols-1 md:grid-cols-2 md:gap-5">
        {state.plans.map((plan: Plan, i) => <PlanItem key={i} plan={plan} />)}
      </div>
    );
  } else if (state.loading) {
    return <PlanLoadingList />
  }
}
