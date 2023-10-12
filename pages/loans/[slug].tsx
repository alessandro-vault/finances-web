import { useRouter } from 'next/router'
import AppLayout from "@/components/app-layout";

export default function NewLoan() {
    const router = useRouter()
    return (
        <AppLayout>
            <section>
                Loan ID{router.query.slug}
            </section>
        </AppLayout>
    )
}