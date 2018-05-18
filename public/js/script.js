function dept_changed(event) {
    var select = document.getElementById('docs');
    select.innerHTML = '';

    fetch('http://localhost:3000/patient/getdocs?qd=' + event.target.value)
    .then( resp => resp.json() )
    .then( result => {
        for(var i=0; i<result.length;i++){
            var opt = document.createElement('option');
            opt.value = result[i];
            opt.innerHTML = result[i];
            select.appendChild(opt);
        }
    })
}