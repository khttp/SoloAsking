
import { redirect } from 'next/navigation';

export default function HomePage() {
  redirect('/questions');
  // This return is technically unreachable but good practice
  return null;
}
