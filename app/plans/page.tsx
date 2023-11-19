"use client";
import { useEffect, useState } from "react";

import PlanLoadingList from "@/components/plans/plan-list-loading";
import { Plan } from "@/types/plan";
import PlanItem from "@/components/plans/plan-item";
import { Button } from "@/components/ui/button";
import Link from "next/link";

export default function PlansPage() {
  const [state, setState] = useState({ plans: [], loading: true, error: null });

  useEffect(() => {
    fetch("/api/plans")
      .then((res) => res.json())
      .then(({ plans }) => {
        setState({ plans: plans, loading: false, error: null });
      })
      .catch((error) => {
        setState({ plans: [], loading: false, error: error });
      });
  }, []);

  if (state.error) {
    return (
      <div className="h-full w-full flex justify-center items-center">
        {state.error}
      </div>
    );
  }

  if (state.loading) {
    return (
      <div className="h-full w-full flex justify-center items-center">
        <PlanLoadingList />
      </div>
    );
  }

  if (state.plans) {
    if (state.plans.length > 0)
      return (
        <div className="h-full transition ease-in-out delay-150 w-full p-10 gap-y-5 xl:w-10/12 grid grid-cols-1 md:grid-cols-2 md:gap-5 place-items-center">
          {state.plans.map((plan: Plan, i) => (
            <PlanItem key={i} plan={plan} />
          ))}
        </div>
      );
    else
      return (
        <div className="h-full w-full flex justify-center items-center flex-col">
          <p className="text-2xl text-gray-400">No se encontraron planes</p>
          <Link href="/calculate">
            <Button className="mt-5" variant="outline">
              Crear un plan
            </Button>
          </Link>
        </div>
      );
  }
}
