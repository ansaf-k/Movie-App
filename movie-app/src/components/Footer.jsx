import { Facebook, Twitter, Instagram, Youtube, Mail, Phone, MapPin } from 'lucide-react'

const Footer = () => {
  return (
    <footer className="bg-gray-950 text-base-content">
      <div className="container mx-auto px-4 py-10">
        <div className="footer grid-cols-2 sm:grid-cols-4 gap-8">
          <div>
            <span className="footer-title">Company</span>
            <a href="/about" className="a a-hover">About us</a>
            <a href="/contact" className="a a-hover">Contact</a>
            <a href="/jobs" className="a a-hover">Jobs</a>
            <a href="/press-kit" className="a a-hover">Press kit</a>
          </div> 
          <div>
            <span className="footer-title">Legal</span>
            <a href="/terms" className="a a-hover">Terms of use</a>
            <a href="/privacy" className="a a-hover">Privacy policy</a>
            <a href="/cookie" className="a a-hover">Cookie policy</a>
          </div> 
          <div>
            <span className="footer-title">Social</span>
            <div className="grid grid-flow-col gap-4">
              <a href="https://facebook.com" target="_blank" rel="noopener noreferrer" className="btn btn-ghost btn-square">
                <Facebook className="h-6 w-6" />
              </a> 
              <a href="https://twitter.com" target="_blank" rel="noopener noreferrer" className="btn btn-ghost btn-square">
                <Twitter className="h-6 w-6" />
              </a> 
              <a href="https://instagram.com" target="_blank" rel="noopener noreferrer" className="btn btn-ghost btn-square">
                <Instagram className="h-6 w-6" />
              </a>
              <a href="https://youtube.com" target="_blank" rel="noopener noreferrer" className="btn btn-ghost btn-square">
                <Youtube className="h-6 w-6" />
              </a>
            </div>
          </div>
          <div>
            <span className="footer-title">Contact</span>
            <a className="a a-hover flex items-center gap-2">
              <Mail className="h-4 w-4" /> contact@cineflix.com
            </a>
            <a className="a a-hover flex items-center gap-2">
              <Phone className="h-4 w-4" /> +91 123-4567-890
            </a>
            <a className="a a-hover flex items-center gap-2">
              <MapPin className="h-4 w-4" /> Mollywood, CA 666
            </a>
          </div>
        </div>
        <div className="mt-10 pt-6 border-t border-base-300 text-center">
          <p>&copy; {new Date().getFullYear()} Cineflix. All rights reserved.</p>
        </div>
      </div>
    </footer>
  )
}

export default Footer

