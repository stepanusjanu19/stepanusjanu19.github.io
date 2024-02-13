onload = () =>{
        document.body.classList.remove("container");
        const textElement = document.querySelector('.text');
        textElement.innerText = 'Agnes Veronika 🩷';
        const opacity = 0;
        const intervalID = 0;
        setInterval(() => {
                const element = document.getElementById("center-ds");
                element.classList.remove("center-ds"); 

                opacity = 
                Number(window.getComputedStyle(element).getPropertyValue("opacity")) 

                if(opacity>0){ 
                        opacity=opacity-0.1; 
                                element.style.opacity=opacity 
                    } 
                    else{ 
                        clearInterval(intervalID); 
                    } 

        }, 3500);
};



// onload = () => {
//         const c = setTimeout(() => {
//           document.body.classList.remove("container");
//           clearTimeout(c);
//         }, 1000);
//       };
      