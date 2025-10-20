import { Instagram, Mail, Phone } from "lucide-react";

const Footer = () => {
  return (
    <footer className="border-t border-border/50 py-12 relative">
      <div className="container mx-auto px-4">
        <div className="grid md:grid-cols-3 gap-8 mb-8">
          <div className="space-y-4">
            <h3 className="text-2xl font-bold">
              <span className="text-gradient">LEAVE YOUR MARK</span>
            </h3>
            <p className="text-muted-foreground">
              Criando experiências que deixam marca no mundo
            </p>
          </div>

          <div className="space-y-4">
            <h4 className="font-bold text-lg">Links Rápidos</h4>
            <div className="flex flex-col space-y-2">
              <a href="#home" className="text-muted-foreground hover:text-foreground transition-colors">
                Início
              </a>
              <a href="#about" className="text-muted-foreground hover:text-foreground transition-colors">
                Sobre
              </a>
              <a href="#services" className="text-muted-foreground hover:text-foreground transition-colors">
                Serviços
              </a>
              <a href="#gallery" className="text-muted-foreground hover:text-foreground transition-colors">
                Galeria
              </a>
            </div>
          </div>

          <div className="space-y-4">
            <h4 className="font-bold text-lg">Contacto</h4>
            <div className="flex flex-col space-y-3">
              <a 
                href="tel:+351935442979"
                className="flex items-center space-x-2 text-muted-foreground hover:text-foreground transition-colors"
              >
                <Phone size={18} />
                <span>+351 935 442 979</span>
              </a>
              <a 
                href="mailto:leaveyourmark.contacto@gmail.com"
                className="flex items-center space-x-2 text-muted-foreground hover:text-foreground transition-colors"
              >
                <Mail size={18} />
                <span>leaveyourmark.contacto@gmail.com</span>
              </a>
              <a 
                href="https://www.instagram.com/leaveyourmark.pt/"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center space-x-2 text-muted-foreground hover:text-foreground transition-colors"
              >
                <Instagram size={18} />
                <span>@leaveyourmark.pt</span>
              </a>
            </div>
          </div>
        </div>

        <div className="border-t border-border/50 pt-8 text-center text-muted-foreground">
          <p>&copy; {new Date().getFullYear()} LEAVE YOUR MARK. Todos os direitos reservados.</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
