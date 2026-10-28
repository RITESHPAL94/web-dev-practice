
console.log("Lets write JavaScript");

let currentSong = new Audio();
let songs = [];
let currFolder = "songs/love";
let currentTrack = "";
let isMuted = false;
let previousVolume = 0.1;

// Format seconds as MM:SS
function secondsToMinutesSeconds(seconds) {
    if (isNaN(seconds) || seconds < 0) {
        return "00:00";
    }

    const minutes = Math.floor(seconds / 60);
    const remainingSeconds = Math.floor(seconds % 60);

    return `${String(minutes).padStart(2, "0")}:${String(
        remainingSeconds
    ).padStart(2, "0")}`;
}

// Encode each part of a song URL safely
function getSongURL(folder, track) {
    return "/" + folder.split("/").map(encodeURIComponent).join("/")
        + "/" + track.split("/").map(encodeURIComponent).join("/");
}

// Play a song
function playMusic(track, pause = false) {
    if (!track) {
        console.error("Song nahi mila!");
        return;
    }

    currentTrack = track;

    currentSong.src = getSongURL(currFolder, track);

    document.querySelector(".songinfo").textContent =
        decodeURIComponent(track);

    document.querySelector(".songtime").textContent = "00:00 / 00:00";

    document.querySelector("#play").src = "image/play.svg";

    if (!pause) {
        currentSong.play()
            .then(() => {
                document.querySelector("#play").src = "image/pause.svg";
            })
            .catch(error => {
                console.error("Song play nahi hua:", error);
            });
    }
}

// Load songs from a folder
async function getSongs(folder) {
    currFolder = folder;

    try {
        const response = await fetch(`/${folder}/`);

        if (!response.ok) {
            throw new Error("Folder nahi mila: " + folder);
        }

        const html = await response.text();
        const div = document.createElement("div");
        div.innerHTML = html;

        const anchors = div.querySelectorAll("a");
        const playlist = [];

        anchors.forEach(anchor => {
            let href = anchor.getAttribute("href");

            if (!href) return;

            href = decodeURIComponent(href).replace(/\\/g, "/");

            // Ignore folders and accept MP3 files only
            if (href.toLowerCase().split("?")[0].endsWith(".mp3")) {
                const filename = href.split("/").pop();

                if (filename) {
                    playlist.push(filename);
                }
            }
        });

        songs = playlist;

        // Show playlist songs
        const songList = document.querySelector(".songlist ul");
        songList.innerHTML = "";

        songs.forEach((song, index) => {
            const li = document.createElement("li");

            const musicIcon = document.createElement("img");
            musicIcon.className = "invert";
            musicIcon.src = "image/music.svg";
            musicIcon.alt = "";

            const info = document.createElement("div");
            info.className = "info";

            const title = document.createElement("div");
            title.textContent = song;

            const artist = document.createElement("div");
            artist.textContent = "Song " + (index + 1);

            info.append(title, artist);

            const playNow = document.createElement("div");
            playNow.className = "playnow";

            const label = document.createElement("span");
            label.textContent = "Play Now";

            const playIcon = document.createElement("img");
            playIcon.className = "invert";
            playIcon.src = "image/play.svg";
            playIcon.alt = "";

            playNow.append(label, playIcon);
            li.append(musicIcon, info, playNow);

            li.addEventListener("click", () => {
                playMusic(song);
            });

            songList.appendChild(li);
        });

        console.log("Songs loaded:", folder, songs);
        return songs;

    } catch (error) {
        console.error("Songs load karne mein error:", error);
        songs = [];
        return songs;
    }
}

// Load album cards
async function displayAlbums() {
    const cardContainer = document.querySelector(".cardcontainer");
    cardContainer.innerHTML = "";

    try {
        const response = await fetch("/songs/");

        if (!response.ok) {
            throw new Error("Songs folder nahi mila");
        }

        const html = await response.text();
        const div = document.createElement("div");
        div.innerHTML = html;

        const anchors = Array.from(div.querySelectorAll("a"));

        for (const anchor of anchors) {
            let href = decodeURIComponent(
                anchor.getAttribute("href") || ""
            ).replace(/\\/g, "/");

            if (!href.endsWith("/")) continue;

            const folder = href.split("/").filter(Boolean).pop();

            if (!folder || folder === "..") continue;

            try {
                const res = await fetch(
                    `/songs/${encodeURIComponent(folder)}/info.json`
                );

                if (!res.ok) continue;

                const album = await res.json();

                const card = document.createElement("div");
                card.className = "card";
                card.dataset.folder = folder;

                const playIcon = document.createElement("div");
                playIcon.className = "play";
                playIcon.textContent = "▶";

                const cover = document.createElement("img");
                cover.src = `/songs/${encodeURIComponent(folder)}/cover.jpg`;
                cover.alt = album.title || folder;

                const title = document.createElement("h2");
                title.textContent = album.title || "Untitled Album";

                const description = document.createElement("p");
                description.textContent = album.description || "";

                card.append(playIcon, cover, title, description);

                // Click card to load and play first song
                card.addEventListener("click", async () => {
                    const playlist = await getSongs(`songs/${folder}`);

                    if (playlist.length > 0) {
                        playMusic(playlist[0]);
                    } else {
                        console.error(
                            "Is playlist mein koi MP3 nahi mili:",
                            folder
                        );
                    }
                });

                cardContainer.appendChild(card);

            } catch (error) {
                console.error("Album load error:", folder, error);
            }
        }
    } catch (error) {
        console.error("Albums load nahi hue:", error);
    }
}

async function main() {
    const playButton = document.querySelector("#play");
    const previousButton = document.querySelector("#previous");
    const nextButton = document.querySelector("#next");
    const volumeSlider = document.querySelector(
        '.range input[type="range"]'
    );
    const volumeIcon = document.querySelector(".volume img");

    // Initial playlist
    await getSongs("songs/love");

    if (songs.length > 0) {
        playMusic(songs[0], true);
    }

    // Album cards
    await displayAlbums();

    // Play / Pause
    playButton.addEventListener("click", async () => {
        if (!currentSong.src) {
            if (songs.length > 0) {
                playMusic(songs[0]);
            }
            return;
        }

        if (currentSong.paused) {
            try {
                await currentSong.play();
                playButton.src = "image/pause.svg";
            } catch (error) {
                console.error("Playback error:", error);
            }
        } else {
            currentSong.pause();
            playButton.src = "image/play.svg";
        }
    });

    // Previous song
    previousButton.addEventListener("click", () => {
        const index = songs.indexOf(currentTrack);

        if (index > 0) {
            playMusic(songs[index - 1]);
        } else if (index === 0) {
            playMusic(songs[0]);
        }
    });

    // Next song
    nextButton.addEventListener("click", () => {
        const index = songs.indexOf(currentTrack);

        if (index !== -1 && index < songs.length - 1) {
            playMusic(songs[index + 1]);
        }
    });

    // Update song time and seekbar
    currentSong.addEventListener("timeupdate", () => {
        document.querySelector(".songtime").textContent =
            `${secondsToMinutesSeconds(currentSong.currentTime)} / ` +
            `${secondsToMinutesSeconds(currentSong.duration)}`;

        if (Number.isFinite(currentSong.duration) &&
            currentSong.duration > 0) {
            document.querySelector(".circle").style.left =
                (currentSong.currentTime / currentSong.duration) * 100 + "%";
        }
    });

    // Keep play icon in sync
    currentSong.addEventListener("play", () => {
        playButton.src = "image/pause.svg";
    });

    currentSong.addEventListener("pause", () => {
        playButton.src = "image/play.svg";
    });

    currentSong.addEventListener("ended", () => {
        const index = songs.indexOf(currentTrack);

        if (index !== -1 && index < songs.length - 1) {
            playMusic(songs[index + 1]);
        } else {
            playButton.src = "image/play.svg";
        }
    });

    // Seekbar
    document.querySelector(".seekbar").addEventListener("click", event => {
        if (!Number.isFinite(currentSong.duration) ||
            currentSong.duration <= 0) return;

        const rect = event.currentTarget.getBoundingClientRect();
        const percent = Math.max(
            0,
            Math.min(1, (event.clientX - rect.left) / rect.width)
        );

        currentSong.currentTime = percent * currentSong.duration;
    });

    // Volume slider
    volumeSlider.value = 10;
    currentSong.volume = 0.1;

    volumeSlider.addEventListener("input", event => {
        currentSong.volume = Number(event.target.value) / 100;
        isMuted = currentSong.volume === 0;

        if (currentSong.volume > 0) {
            previousVolume = currentSong.volume;
        }

        volumeIcon.src = isMuted ? "image/mute.svg" : "image/volume.svg";
    });

    // Mute / Unmute
    volumeIcon.addEventListener("click", () => {
        if (!isMuted && currentSong.volume > 0) {
            previousVolume = currentSong.volume;
            currentSong.volume = 0;
            volumeSlider.value = 0;
            isMuted = true;
            volumeIcon.src = "image/mute.svg";
        } else {
            currentSong.volume = previousVolume || 0.1;
            volumeSlider.value = currentSong.volume * 100;
            isMuted = false;
            volumeIcon.src = "image/volume.svg";
        }
    });

    // Mobile sidebar
    document.querySelector(".hamburger").addEventListener("click", () => {
        document.querySelector(".left").style.left = "0";
    });

    document.querySelector(".close").addEventListener("click", () => {
        document.querySelector(".left").style.left = "-120%";
    });
}

main();















































































// console.log('Lets write JavaScript');
// let currentsong = new Audio()
// let songs
// let currfolder
// let currentTrack = "";

// function secondsToMinutesSeconds(seconds) {
//     if (isNaN(seconds) || seconds < 0) {
//         return "00:00";
//     }

//     const minutes = Math.floor(seconds / 60);
//     const remainingSeconds = Math.floor(seconds % 60);

//     const formattedMinutes = String(minutes).padStart(2, '0');
//     const formattedSeconds = String(remainingSeconds).padStart(2, '0');

//     return `${formattedMinutes}:${formattedSeconds}`;

// }



// async function getSongs(folder) {
//     currfolder = folder
//     let a = await fetch(`/${folder}/`);
//     let response = await a.text();

//     let div = document.createElement("div");
//     div.innerHTML = response;

//     let as = div.getElementsByTagName("a");
//     songs = [];

//     for (let index = 0; index < as.length; index++) {
//         const element = as[index];
//         const href = element.getAttribute("href");

//         if (href && href.toLowerCase().includes(".mp3")) {
//             let songName = decodeURIComponent(href)
//                 .replace(/\\/g, "/")
//                 .split("/")
//                 .pop()
//                 .trim();

//             songs.push(songName);
//         }
//     }


//     // Show all the songs in the playlist
//     let songul = document.querySelector(".songlist").getElementsByTagName("ul")[0]
//     songul.innerHTML = ""
//     for (const song of songs) {
//         songul.innerHTML = songul.innerHTML + `<li>
//         <img class="invert" src="music.svg" alt="">
//                         <div class="info">
//                             <div>${song}</div>
//                             <div> Ghost </div>
//                         </div>
//                         <div class="playnow">
//                             <span>Play Now</span>
//                             <img class="invert" src="play.svg" alt="">
//                         </div></li>`
//     }

//     // Attach an event listener to each song
//     Array.from(document.querySelector(".songlist").getElementsByTagName("li")).forEach(e => {
//         e.addEventListener("click", element => {
//             console.log(e.querySelector(".info").firstElementChild.innerHTML)
//             playMusic(e.querySelector(".info").firstElementChild.innerHTML.trim())
//         })
//     })

// }

// const playMusic = (track, pause = false) => {
//     if (!track) {
//         console.error("Song name missing!");
//         return;
//     }

//     currentTrack = track;
//     currentsong.src = `/${currfolder}/${encodeURIComponent(track)}`;

//     if (!pause) {
//         currentsong.play();
//         play.src = "pause.svg";
//     }

//     document.querySelector(".songinfo").innerHTML = track;
//     document.querySelector(".songtime").innerHTML = "00:00 / 00:00";


// };


// async function displayAlbums() {
//     let a = await fetch("/songs/");
//     let response = await a.text();

//     let div = document.createElement("div");
//     div.innerHTML = response;

//     let anchors = div.getElementsByTagName("a");
//     let cardcontainer = document.querySelector(".cardcontainer");

//     cardcontainer.innerHTML = "";

//     for (const e of Array.from(anchors)) {
//         let href = decodeURIComponent(e.getAttribute("href") || "");
//         href = href.replace(/\\/g, "/");

//         if (href.includes("/songs/") && href.endsWith("/")) {
//             let folder = href.split("/").filter(Boolean).pop();

//             if (!folder || folder === "..") continue;

//             try {
//                 let res = await fetch(`/songs/${folder}/info.json`);

//                 if (!res.ok) {
//                     console.error(`${folder}/info.json nahi mili`);
//                     continue;
//                 }

//                 let album = await res.json();

//                 console.log("Album data:", album);

//                 cardcontainer.innerHTML += `
//                     <div data-folder="${folder}" class="card">
//                         <div class="play">▶</div>
//                         <img src="/songs/${folder}/cover.jpg" alt="">
//                         <h2>${album.title || "Untitled Album"}</h2>
//                         <p>${album.description || ""}</p>
//                     </div>
//                 `;
//             } catch (error) {
//                 console.error("Album load error:", folder, error);
//             }
//         }

//     }
//     // Load the playlist whenever the card is clicked
//     Array.from(document.getElementsByClassName("card")).forEach(e => {
//         e.addEventListener("click", async item => {
//             songs = await getSongs(`songs/${item.currentTarget.dataset.folder}`);
            

//             if (songs.length > 0) {
//                 playMusic(songs[0]);
//             }

//         })
//     })
//     return songs
// }





// async function main() {


//     // Get the list of all the songs
//     await getSongs("songs/love")
//     playMusic(songs[0], true)



//     // Display all the albums on the page
//     displayAlbums()
//     // Attach an event listner to next and previous 
//     play.addEventListener("click", () => {
//         if (currentsong.paused) {
//             currentsong.play()
//             play.src = "pause.svg"
//         }
//         else {
//             currentsong.pause()
//             play.src = "play.svg"
//         }
//     })

//     // Listen for timeupdate event
//     currentsong.addEventListener("timeupdate", () => {
//         console.log(currentsong.currentTime, currentsong.duration)
//         document.querySelector(".songtime").innerHTML = `${secondsToMinutesSeconds(currentsong.currentTime)} / ${secondsToMinutesSeconds(currentsong.duration)}`
//         document.querySelector(".circle").style.left = (currentsong.currentTime / currentsong.duration) * 100 + "%";
//     })


//     // Add an event listner to seekbar
//     document.querySelector(".seekbar").addEventListener("click", e => {
//         let percent = (e.offsetX / e.target.getBoundingClientRect().width) * 100;
//         document.querySelector(".circle").style.left = percent + "%";
//         currentsong.currentTime = ((currentsong.duration) * percent) / 100
//     })

//     // Add an event listner for hamburger
//     document.querySelector(".hamburger").addEventListener("click", () => {
//         document.querySelector(".left").style.left = "0"
//     })

//     // Add an event listner for close
//     document.querySelector(".close").addEventListener("click", () => {
//         document.querySelector(".left").style.left = "-120%"
//     })


//     // Previous button
//     previous.addEventListener("click", () => {
//         let index = songs.indexOf(currentTrack);

//         console.log("Current track:", currentTrack);
//         console.log("Songs array:", songs);
//         console.log("Current index:", index);

//         if (index > 0) {
//             playMusic(songs[index - 1]);
//         } else {
//             console.log("Previous song nahi hai");
//         }
//     });

//     // Next button
//     next.addEventListener("click", () => {
//         let index = songs.indexOf(currentTrack);

//         console.log("Current track:", currentTrack);
//         console.log("Songs array:", songs);
//         console.log("Current index:", index);

//         if (index !== -1 && index < songs.length - 1) {
//             playMusic(songs[index + 1]);
//         } else {
//             console.log("Next song nahi hai");
//         }
//     });


//     // Add an event to volume

//     document.querySelector(".range").getElementsByTagName("input")[0].addEventListener("change", (e) => {
//         console.log(e, e.target, e.target.value)
//         currentsong.volume = parseInt(e.target.value) / 100
//     })


//     // Add event listner to mute the track
//     document.querySelector(".volume>img").addEventListener("click", e => {
//         console.log(e.target)
//         if (e.target.src.includes("volume.svg")) {
//             e.target.src = e.target.src.replace("volume.svg", "mute.svg")
//             currentsong.volume = 0
//             document.querySelector(".range").getElementsByTagName("input")[0].value = 0
//         }
//         else {
//             e.target.src = e.target.src.replace("mute.svg", "volume.svg")
//             currentsong.volume = .10
//             document.querySelector(".range").getElementsByTagName("input")[0].value = 10
//         }
//     })

// }
// main()



























// // let currentSong = new Audio();
// // let songs;
// // let currFolder;

// function secondsToMinutesSeconds(seconds) {
//     if (isNaN(seconds) || seconds < 0) {
//         return "00:00";
//     }

//     const minutes = Math.floor(seconds / 60);
//     const remainingSeconds = Math.floor(seconds % 60);

//     const formattedMinutes = String(minutes).padStart(2, '0');
//     const formattedSeconds = String(remainingSeconds).padStart(2, '0');

//     return `${formattedMinutes}:${formattedSeconds}`;
// }

// async function getSongs(folder) {
//     currFolder = folder;
//     let a = await fetch("http://127.0.0.1:3000/songs/")
//     let response = await a.text();
//     let div = document.createElement("div")
//     div.innerHTML = response;
//     let as = div.getElementsByTagName("a")
//     songs = []
//     for (let index = 0; index < as.length; index++) {
//         const element = as[index];
//         if (element.href.endsWith(".mp3")) {
//             songs.push(element.href.split(`/${folder}/`)[1])
//         }
//     }

//     //show all the songs in the playlist
//     let songUL = document.querySelector(".songList").getElementsByTagName("ul")[0]
//     songUL.innerHTML = ""
//     for (const song of songs) {
//         songUL.innerHTML = songUL.innerHTML + `<li><img class="invert" width="34" src="img/music.svg" alt="">
//                             <div class="info">
//                                 <div> ${song.replaceAll("%20", " ")}</div>
//                                 <div>Harry</div>
//                             </div>
//                             <div class="playnow">
//                                 <span>Play Now</span>
//                                 <img class="invert" src="img/play.svg" alt="">
//                             </div> </li>`;
//     }

//     // Attach an event listner to each song
//     Array.from(document.querySelector(".songList").getElementsByTagName("li")).forEach(e => {
//         e.addEventListener("click", element => {
//             playMusic(e.querySelector(".info").firstElementChild.innerHTML.trim())

//         })
//     })

//     return songs
// }



// // Attach an event listner to play, next and previous
// play.addEventListener("click", () => {
//     if (currentSong.paused) {
//         currentSong.play()
//         play.src = "img/pause.svg"
//     }
//     else {
//         currentSong.pause()
//         play.src = "img/play.svg"
//     }
// })

// // Listen for timeupadate event
// currentSong.addEventListener("timeupdate", () => {
//     document.querySelector(".songtime").innerHTML = `${secondsToMinutesSeconds(currentSong.currentTime)} / ${secondsToMinutesSeconds(currentSong.duration)}`
//     document.querySelector(".circle").style.left = (currentSong.currentTime / currentSong.duration) * 100 + "%";
// })



// // Add an event listner to seekbar
// document.querySelector(".seekbar").addEventListener("click", e => {
//     let percent = (e.offsetX / e.target.getBoundingClientRect().width) * 100;
//     document.querySelector(".circle").style.left = percent + "%";
//     currentSong.currentTime = ((currentSong.duration) * percent) / 100
// })

// // Add an event listner for hamburger
// document.querySelector(".hamburger").addEventListener("click", () => {
//     document.querySelector(".left").style.left = "0"
// })

// // Add event listner for close button
// document.querySelector(".close").addEventListener("click", () => {
//     document.querySelector(".left").style.left = "-120%"
// })

// // Add an event listner to previous and next


// // Previous song
// previous.addEventListener("click", () => {
//     currentSong.pause()
//     console.log("Previous clicked")
//     let index = songs.indexOf(currentSong.src.split("/").slice(-1)[0])
//     if ((index - 1) >= 0) {
//         playMusic(songs[index - 1])
//     }
// })

// // Next song
// next.addEventListener("click", () => {
//     currentSong.pause()
//     console.log("Next clicked")

//     let index = songs.indexOf(currentSong.src.split("/").slice(-1)[0])
//     if ((index + 1) < songs.length) {
//         playMusic(songs[index + 1])
//     }
// })

// // Add an event to volume
// document.querySelector(".range").getElementsByTagName("input")[0].addEventListener("change", (e) => {
//     console.log("Setting volume to", e.target.value, "/ 100")
//     currentSong.volume = parseInt(e.target.value) / 100
//     if (currentSong.volume > 0) {
//         document.querySelector(".volume>img").src = document.querySelector(".volume>img").src.replace("mute.svg", "volume.svg")
//     }
// })


// main()