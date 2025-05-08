//  탭메뉴
const tabs = document.querySelectorAll('.tab');
const tabContent = document.querySelectorAll('.tab_content');
console.log(tabs);
console.log(tabContent);

tabs.forEach(tab => {
      tab.addEventListener('click', () => {
            tabs.forEach(t => t.classList.remove('active'));
            tabContent.forEach(tcontent => tcontent.classList.remove('active'));
            tab.classList.add('active');
            document.getElementById('tab_' + tab.dataset.tab).classList.add('active');
            console.log(tab.dataset);
            console.log(tab.dataset.tab);
      });
});





// 지점검색
const inputText = document.getElementById("input_text");
let btn = document.querySelector(".search_btn");
btn.addEventListener("click", input);
window.addEventListener("keyup", (e)=> {
    if(e.key == "Enter" && inputText === document.activeElement) {
        //inputText === document.activeElement (활성화된게 inputText 일때 엔터를 누르면 먹음(inputText 없으면 안 먹음))
        input();
    }
});

function input() {
    window.open("https://www.google.com/maps/search/%EB%9F%B0%EB%8D%98%EB%B2%A0%EC%9D%B4%EA%B8%80%EB%AE%A4%EC%A7%80%EC%97%84" + inputText.value + "/data=!3m1!4b1?entry=ttu&g_ep=EgoyMDI1MDUwNS4wIKXMDSoASAFQAw%3D%3D");
}