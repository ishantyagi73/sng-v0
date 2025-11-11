import { Mail, Instagram } from "lucide-react"

export function Footer() {
  return (
    <footer className="bg-slate-50 border-t border-border py-8">
      <div className="max-w-7xl mx-auto px-4 md:px-6">
        <div className="flex flex-col md:flex-row items-center justify-between gap-4">
          <p className="text-sm text-muted-foreground">SNG • A community-led climate education program.</p>
          <div className="flex items-center gap-4">
            <a
              href="mailto:contact@sng.org"
              className="text-muted-foreground hover:text-foreground transition-colors"
              aria-label="Email"
            >
              <Mail className="w-5 h-5" />
            </a>
            <a
              href="#"
              className="text-muted-foreground hover:text-foreground transition-colors"
              aria-label="Instagram"
            >
              <Instagram className="w-5 h-5" />
            </a>
          </div>
        </div>
      </div>
    </footer>
  )
}
