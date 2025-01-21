import { NavContainer, NavItem } from "@/ui/navbar";

export default function Navbar() {
  return (
    <NavContainer>
      <NavItem
        href="/"
        imageSrc="/images/np_home.svg"
        imageAlt="A white house on a black background."
      />
      <NavItem
        href="/files/all"
        imageSrc="/images/np_files.svg"
        imageAlt="A black and white photo of a book."
      />
      <NavItem
        href="/escrow"
        imageSrc="/images/np_handshake.svg"
        imageAlt="A black and white image of a hand shaking another hand"
      />
      <NavItem
        isComingSoon={true}
        imageSrc="/images/np_exchange.svg"
        imageAlt="A black and white photo of an arrow."
      />
    </NavContainer>
  );
}
