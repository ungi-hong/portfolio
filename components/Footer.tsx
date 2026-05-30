import { profile } from "@/lib/content";

export default function Footer() {
  return (
    <footer className="foot">
      <div className="wrap">
        <span className="brand">
          <span className="mark" />
          {profile.brand}
        </span>
        <small>{profile.footer}</small>
      </div>
    </footer>
  );
}
