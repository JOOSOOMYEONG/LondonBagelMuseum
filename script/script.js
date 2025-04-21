const tabs = document.querySelectorAll('.tab');
        const tabContent = document.querySelectorAll('.tab_content');
        console.log(tabs);
        console.log(tabContent);

        tabs.forEach(tab => {
            /*
            forEach((item,index,array) => {
                item :  현재 순화 중인 배열의 요소(필수!, 작명은 자유)
                index : 현재 요소의 인덱스(선택)
                array : 현재 순화 중인 배열 자체(선택)
            });
            */
           tab.addEventListener('click', () => {
                tabs.forEach(t => t.classList.remove('active'));
                // day4 - 요소선택메서드
                tabContent.forEach(tcontent => tcontent.classList.remove('active'));
                tab.classList.add('active');
                document.getElementById('tab_' + tab.dataset.tab).classList.add('active');
                // dataset : HTML 요소의 data-* 속성을 읽거나 설정할 수 있는 js 객체.
                // tab.dataset : 요소의 모든 data-tab 번호를 가져옴.
                // tab.dataset.tab : domString이 아닌 tab 속성의 값만 빼오겠다는 뜻.
                console.log(tab.dataset);
                console.log(tab.dataset.tab);
           });
        });