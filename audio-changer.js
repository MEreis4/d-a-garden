const songs = [
    {title: "DUBIOUS DEPTHS", file:"audio/dd-present.mp3", era: "present"},
    {title: "PALMTREE PANIC", file:"audio/pp-present.mp3", era: "present"},
    {title: "PALMTREE PANIC G MIX", file:"audio/pp-gf.mp3", era: "good-future"},
    {title: "PALMTREE PANIC B MIX", file:"audio/pp-bf.mp3", era: "bad-future"},
    {title: "COLLISION CHAOS", file:"audio/cc-present.mp3", era: "present"}
];

function musicPicker(){
    if (!isLoading || !teclaSairdoLoading) return;

    document.addEventListener("keydown", (event)=>{
        if (event.key == "Enter" || event.key == Space){
            
        }
    });
}