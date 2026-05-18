const track = document.querySelector(".music-picker");
let isMusicActive = false;
const songs = [
    {title: "PALMTREE PANIC", file:"audio/pp-present.mp3", era: "present"},
    {title: "PALMTREE PANIC G MIX", file:"audio/pp-gf.mp3", era: "good-future"},
    {title: "PALMTREE PANIC B MIX", file:"audio/pp-bf.mp3", era: "bad-future"},
    {title: "COLLISION CHAOS", file:"audio/cc-present.mp3", era: "present"},
    {title: "DUBIOUS DEPTHS", file:"audio/dd-present.mp3", era: "present"}
];

let currentIndex = 0;

function processSongs(){
    for (const s of songs){
        // console.log(s, s.title, s.file, s.era);
        const song = document.createElement('div');
        song.innerText = s.title;
        track.appendChild(song);
    }
};
processSongs();

function activateMusicPicker(){
    document.addEventListener("keydown", (event)=>{
        if (!teclaSairdoLoading) return;
        if (event.code === "Enter" || event.code === "Space"){
            console.log(event.code + " pressionado");
            track.style.transform = `translateX(0)`;
            isMusicActive = true;
        }
    });
};
activateMusicPicker();
function deactivateMusicPicker(){
    document.addEventListener("keydown", (event)=>{
        if (!isMusicActive) return;
        if (event.code === "Escape"){
            track.style.transform = `translateY(10vh)`;
            isMusicActive = false;
        }
    })
};
deactivateMusicPicker();

// function nextTrack(){
//     document.addEventListener("keydown", (event)=>{
//         if(teclaSairdoLoading && !isActive) return;

//         if (event.code === "ArrowLeft"){
            
//         }
//     })
// }