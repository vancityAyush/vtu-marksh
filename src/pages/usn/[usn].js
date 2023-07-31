import { useRouter } from 'next/router';

export default function UserPage() {
  const router = useRouter();
  const { usn } = router.query;

  return (
    <div>
      <h1>Your USN: {usn}</h1>
    </div>
  );
}
