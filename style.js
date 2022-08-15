window.addEventListener("load", function () {
  const playButton = this.document.querySelector(".player-play");
  const prevButton = this.document.querySelector(".player-prev");
  const nextButton = this.document.querySelector(".player-next");
  const randomButton = this.document.querySelector(".player-random");
  const playImage = this.document.querySelector(".player-image");
  const playDuration = this.document.querySelector(".player-duration");
  const remaining = this.document.querySelector(".player-remaining");
  const song = this.document.querySelector("#song");
  const progressBar = this.document.querySelector("#progress-bar");
  let playing = true;
  let songIndex = 0;
  const listMusic = [
    "ChuyenNguoiAnhThuong-PhamNguyenNgoc.mp3",
    "DaLoYeuEmNhieuMasewRemix-JustaTee.mp3",
    "MaiMaiKhongPhaiAnhLofiVersion2-ThanhBinh.mp3",
    "MatMoc-PhamNguyenNgocVAnhAnNhi.mp3",
    "QuenDatTen-PhamNguyenNgocBMZ.mp3",
    "SuytNuaThiChuyenDiCuaThanhXuanOST-Andiez.mp3",
    "ThangDienLive-JustaTeePhuongLy.mp3",
  ];
  playButton.addEventListener("click", handlePlayMusic);
  nextButton.addEventListener("click", function () {
    handleChangeMucsic(1);
  });
  prevButton.addEventListener("click", function () {
    handleChangeMucsic(-1);
  });
  randomButton.addEventListener("click", function () {
    handleChangeMucsic(0);
  });
  progressBar.addEventListener("change", hanldeDragProgressBar);
  song.addEventListener("ended", function () {
    handleChangeMucsic(1);
  });
  function handleChangeMucsic(direction) {
    if (direction === 1) {
      songIndex++;
      if (songIndex > listMusic.length - 1) songIndex = 0;
      song.setAttribute("src", `./file-music/${listMusic[songIndex]}`);
      playing = true;
      handlePlayMusic();
    } else if (direction === -1) {
      songIndex--;
      if (songIndex < 0) songIndex = listMusic.length - 1;
      song.setAttribute("src", `./file-music/${listMusic[songIndex]}`);
      playing = true;
      handlePlayMusic();
    } else if (direction === 0) {
      let lastMusic = "";
      const music = listMusic[Math.floor(Math.random() * listMusic.length)];
      if (lastMusic !== music) {
        song.setAttribute("src", `./file-music/${music}`);
        lastMusic = music;
      } else {
        song.setAttribute("src", `./file-music/${listMusic[0]}`);
      }
      playing = true;
      handlePlayMusic();
    }
  }
  function handlePlayMusic() {
    if (playing) {
      song.play();
      playButton.classList.add("fa-pause");
      playButton.classList.remove("fa-play");
      playImage.classList.add("is-playing");
      playing = false;
    } else {
      song.pause();
      playButton.classList.remove("fa-pause");
      playButton.classList.add("fa-play");
      playImage.classList.remove("is-playing");
      playing = true;
    }
  }
  function displayTimer() {
    const { duration, currentTime } = song;
    progressBar.max = duration;
    progressBar.value = currentTime;
    remaining.textContent = formatTimer(currentTime);
    if (!duration) {
      playDuration.textContent = "0:00";
    } else {
      playDuration.textContent = formatTimer(duration);
    }
  }
  function formatTimer(number) {
    const minutes = Math.floor(number / 60);
    const seconds = Math.floor(number % 60);
    return `${minutes}:${seconds < 10 ? "0" + seconds : seconds}`;
  }
  this.setInterval(displayTimer, 500);
  function hanldeDragProgressBar() {
    song.currentTime = progressBar.value;
  }
});
