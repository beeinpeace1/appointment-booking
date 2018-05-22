function dept_changed(event) {
    var select = document.getElementById('docs');
    select.innerHTML = '';

    fetch('http://localhost:3000/patient/getdocs?qd=' + event.target.value)
    .then( resp => resp.json() )
    .then( result => {
        if(result.length > 0){
            for(var i=0; i<result.length;i++){
                var opt = document.createElement('option');
                opt.value = `${result[i].name}___${result[i].id}`;
                opt.innerHTML = result[i].name;
                select.appendChild(opt);
            }
        } else {
            var opt = document.createElement('option');
            opt.value = "No Doctors available...";
            opt.innerHTML = "No Doctors available...";
            select.appendChild(opt);
        }
    })
}