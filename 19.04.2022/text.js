let n1=document.getElementById("num1");
let n2=document.getElementById("num2");
let res=document.getElementById("result");

document.getElementById("add").addEventListener("click",function(){
res.value=parseInt(n1.value)+parseInt(n2.value);
});

    document.getElementById("sub").addEventListener("click",function(){
        res.value=parseInt(n1.value)-parseInt(n2.value);
        });
        document.getElementById("multiply").addEventListener("click",function(){
            res.value=parseInt(n1.value)*parseInt(n2.value);
            });
            document.getElementById("division").addEventListener("click",function(){
                res.value=parseInt(n1.value)/parseInt(n2.value);
                });
                document.getElementById("sqrt").addEventListener("click",function(){
                    res.value=Math.sqrt(parseInt(n1.value)+parseInt(n2.value));
                    });

                    document.getElementById("increment").addEventListener("click",function(){
                        res.value=parseInt(n1.value)+1;
                        });
                        document.getElementById("decrement").addEventListener("click",function(){
                            res.value=parseInt(n2.value)-1;
                            });
