import Image from "next/image";
import logo from "../../public/img/logo.png"

export default function Logo() {
    return <Image
    src={logo}
    alt="logo"
    priority={true}
    
    style={{
      position: "absolute",
      top: 10,
      left: 20,
      height: 150,
      width: 150
    }}/> 
}