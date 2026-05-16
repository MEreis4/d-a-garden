const track = document.querySelector(".track");
let isActive = false;
const songs = [
    {title: "DUBIOUS DEPTHS", file:"audio/dd-present.mp3", era: "present"},
    {title: "PALMTREE PANIC", file:"audio/pp-present.mp3", era: "present"},
    {title: "PALMTREE PANIC G MIX", file:"audio/pp-gf.mp3", era: "good-future"},
    {title: "PALMTREE PANIC B MIX", file:"audio/pp-bf.mp3", era: "bad-future"},
    {title: "COLLISION CHAOS", file:"audio/cc-present.mp3", era: "present"}
];

function activateMusicPicker(){
    document.addEventListener("keydown", (event)=>{
        if (!teclaSairdoLoading) return;
        if (event.code === "Enter" || event.code === "Space"){
            console.log(event.code + " pressionado");
            track.style.transform = `translateX(0)`;
            isActive = true;
        }
    });
}
activateMusicPicker();

// function nextTrack(){
//     document.addEventListener("keydown", (event)=>{
//         if(teclaSairdoLoading && !isActive) return;

//         if (event.code === "ArrowLeft"){
            
//         }
//     })
// }