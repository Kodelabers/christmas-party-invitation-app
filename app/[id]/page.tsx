import MainContent from '@/components/MainContent';

export default function InvitePage({ params }: { params: { id: string } }) {
  return <MainContent guestId={params.id} />;
}

