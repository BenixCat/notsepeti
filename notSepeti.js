const yeniGorev = document.querySelector(".input-gorev");
const yeniGorevEkleBtn = document.querySelector(".btn-gorev-ekle");
const gorevListesi = document.querySelector(".gorev-listesi");

yeniGorevEkleBtn.addEventListener("click", gorevEkle);
gorevListesi.addEventListener("click", gorevSilTamamla);
document.addEventListener("DOMContentLoaded", localStorageOku);

function gorevSilTamamla(e) {
  const tiklanilanEleman = e.target;

  if (tiklanilanEleman.classList.contains("gorev-btn-tamamlandi")) {
    console.log("Checked");
    tiklanilanEleman.parentElement.classList.toggle("gorev-tamamlandi");
  }

  if (tiklanilanEleman.classList.contains("gorev-btn-sil")) {
    if (confirm("Emin Siz misiniz?")) {
      console.log("Deleted");
      tiklanilanEleman.parentElement.classList.toggle("kaybol");
      const silinecekGorev =
        tiklanilanEleman.parentElement.children[0].innerText;

      localStorageSil(silinecekGorev);
      tiklanilanEleman.parentElement.addEventListener(
        "transitionend",
        function () {
          tiklanilanEleman.parentElement.remove();
        }
      );
    }
  }
}

function gorevEkle(e) {
  e.preventDefault();
  if (yeniGorev.value.length >= 1) {
    gorevItemOlustur(yeniGorev.value);
    //local staragekaydet
    localStorageKaydet(yeniGorev.value);
    yeniGorev.value = "";
  } else {
    alert("Bos Gorev Vermeyin");
  }
}

function localStorageToArray() {
  if (localStorage.getItem("gorevler") === null) {
    gorevler = [];
  } else {
    gorevler = JSON.parse(localStorage.getItem("gorevler"));
  }
  return gorevler;
}
function localStorageKaydet(yeniGorev) {
  let gorevler = localStorageToArray();
  gorevler.push(yeniGorev);
  localStorage.setItem("gorevler", JSON.stringify(gorevler));
}

function localStorageOku() {
  let gorevler = localStorageToArray();

  gorevler.forEach((gorev) => {
    gorevItemOlustur(gorev);
  });
}

function gorevItemOlustur(gorev) {
  //div olusturma
  const gorevDiv = document.createElement("div");
  gorevDiv.classList.add("gorev-item");

  //li olusturma
  const gorevLi = document.createElement("li");
  gorevLi.classList.add("gorev-tanim");
  gorevLi.innerText = gorev;
  gorevDiv.appendChild(gorevLi);

  //tamamlandi butonu ekle
  const gorevTamamBtn = document.createElement("button");
  gorevTamamBtn.classList.add("gorev-btn");
  gorevTamamBtn.classList.add("gorev-btn-tamamlandi");
  gorevTamamBtn.innerHTML = '<i class="fa-solid fa-check"></i>';
  gorevDiv.appendChild(gorevTamamBtn);

  //Silme butonu ekle
  const gorevSilBtn = document.createElement("button");
  gorevSilBtn.classList.add("gorev-btn");
  gorevSilBtn.classList.add("gorev-btn-sil");
  gorevSilBtn.innerHTML = '<i class="fa-solid fa-trash"></i>';
  gorevDiv.appendChild(gorevSilBtn);

  //ul ye olusturdur8uggmuz divi ekleyelim
  gorevListesi.appendChild(gorevDiv);
}

function localStorageSil(gorev) {
  let gorevler = localStorageToArray();

  //splice ile item sil
  const silinecekElemenIndex = gorevler.indexOf(gorev);
  console.log(silinecekElemenIndex);
  gorevler.splice(silinecekElemenIndex, 1);

  localStorage.setItem("gorevler", JSON.stringify(gorevler));
}
