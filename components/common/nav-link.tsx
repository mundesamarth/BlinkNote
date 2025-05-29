import Link from "next/link";

export default function NavLink({ children, href }: { children: React.ReactNode; href: string }) {
    return (
        <Link href={href} className="hover:underline">
            {children}
        </Link>
    );
}