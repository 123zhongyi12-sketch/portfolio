import { getProfile } from "@/lib/data";

export default function Footer() {
  const profile = getProfile();
  return (
    <footer id="contact" className="border-t border-dark-border py-12">
      <div className="mx-auto max-w-6xl px-6 text-center">
        <h2 className="mb-6 text-2xl font-bold">联系我</h2>
        <div className="flex flex-col items-center gap-3 text-text-secondary">
          <a href={`mailto:${profile.contacts.email}`} className="hover:text-accent transition-colors">
            {profile.contacts.email}
          </a>
          <a href={profile.contacts.github} target="_blank" rel="noopener noreferrer" className="hover:text-accent transition-colors">
            GitHub
          </a>
          {profile.contacts.phone && (
            <span className="text-text-muted">{profile.contacts.phone}</span>
          )}
        </div>
        <p className="mt-8 text-sm text-text-muted">
          © {new Date().getFullYear()} {profile.name}. All rights reserved.
        </p>
      </div>
    </footer>
  );
}
