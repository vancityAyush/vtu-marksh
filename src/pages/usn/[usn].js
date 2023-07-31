import {useRouter} from 'next/router';

export default function UserPage({data}) {
    const router = useRouter();
    const {usn} = router.query;

    return (
        <div>
            <h1>Your USN: {usn}</h1>
        </div>
    );
}

export async function getServerSideProps() {
    const data = await fetch(
        "/usn"
    );
    return {
        props: {
            data,
        },
    };
}