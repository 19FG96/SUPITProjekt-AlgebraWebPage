$(function() {
    var token = localStorage.getItem('token'); 
    console.log(token);


    if(token){
        $.ajax({
            url: 'https://www.fulek.com/data/api/supit/curriculum-list/hr',
            type: 'GET',
            headers: {
                'Authorization': 'Bearer ' + token 
            },
            success: function(data) {
                console.log(data.data);
                var availableTags =  data.data.map(function(item) {
                    return { label: item.kolegij, value: item } // ovo je label value pair, label je property unutar value-a koji je cijeli objekt
                });

                $( "#tags" ).autocomplete({
                    source: availableTags,
                    select: function(event, ui) {
                        event.preventDefault();
                        
                        updateTableWithSubject(ui.item.value);
                        $(this).val('');
                    }
                });
            },
            error: function(request, textStatus, errorThrown) {
                if (request.status === 401) { 
                    alert('Niste prijavljeni!');
                    window.location.href = 'prijaviSe.html'; // ako korisnik nije autorizirtan, preusmjeri ga na prijavu
                } else {
                    console.log('HTTP Status:', request.status); 
                    console.log('Response Text:', request.responseText);
                    console.log('Error:', errorThrown); 
                    alert('Došlo je do pogreške!');
                }
            }
        });
    } else {
        alert('Niste prijavljeni!');
        window.location.href = 'prijava.html';
    }
});

function updateTableWithSubject(item) {
    
    var $tableBody = $("#subject-table-body");

    

    var newRow = `<tr>
                      <th scope="row">${item.id}</th> <!-- You might want to generate a unique ID -->
                      <td>${item.kolegij}</td>
                      <td>${item.ects}</td>
                      <td>${item.sati}</td>
                      <td>${item.predavanja}</td>
                      <td>${item.vjezbe}</td>
                      <td>${item.tip}</td>
                      <td><button type="button" class="btn remove-row-btn">Ukloni</button></td>
                  </tr>`;

   
    $tableBody.append(newRow);
    updateTotals();

    $("#subject-table-body").on('click', '.remove-row-btn', function() {
        //makni najbližeg parenta ovog buttona (tr)
        $(this).closest('tr').remove();
        updateTotals();
    });
}





function updateTotals() {
    var totalEcts = 0, totalSati = 0, totalPredavanja = 0, totalVjezbe = 0;
    
    $("#subject-table-body tr").each(function() {
        totalEcts += parseInt($(this).find('td:nth-child(3)').text()) || 0;
        totalSati += parseInt($(this).find('td:nth-child(4)').text()) || 0;
        totalPredavanja += parseInt($(this).find('td:nth-child(5)').text()) || 0;
        totalVjezbe += parseInt($(this).find('td:nth-child(6)').text()) || 0;
    });

    $('#total-ects').text(totalEcts);
    $('#total-sati').text(totalSati);
    $('#total-predavanja').text(totalPredavanja);
    $('#total-vjezbe').text(totalVjezbe);
}

function addSubjectToTable(item) {
    updateTotals();
}

$("#subject-table-body").on('click', '.remove-row-btn', function() {
    $(this).closest('tr').remove();
    updateTotals();
});



