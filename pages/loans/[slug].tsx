import { useRouter } from 'next/router'
import AppLayout from "@/components/app-layout";
import {ReactElement} from "react";

export default function NewLoan() : ReactElement {
    const router = useRouter()
    return (
        <AppLayout>
            <section>
                Loan ID{router.query.slug}
            </section>
        </AppLayout>
    )
}