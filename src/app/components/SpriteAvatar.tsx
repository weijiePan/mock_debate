import Image from "next/image";
export default function SpriteAvatar({whichNPC, whichAction}:{whichNPC:keyof object, whichAction:keyof object}){
    const img = {//stores url for each action npcs can take
        judge:{contemplating:"", objection:"", talking:""},
        opponent:{contemplating:"", objection:"", talking:""},

    }
    const url = img[whichNPC][whichAction];
    return(
         <Image
        src={img[whichNPC][whichAction]}
        width={500}
        height={500}
        alt="Picture of the author"
        />
    );
}