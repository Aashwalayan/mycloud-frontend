import "./LogoHeader.css"
import logo from '../assets/mycloudblack.png'


export default function LogoHeader({
    height = 36,
    className = "logo",
    onClick,

}) {
    return (
            <img
                src = {logo}
                alt="My Cloud"
                className={className}
                draggable= {false}
            />
        
    );
}