@foreach($data as $c)
    <tr>
        <td>
            <a href="#" class="href_city" data-name="{{ $c->name }}" data-id="{{ $c->id }}">
                {{ $c->name }}
            </a>
        </td>
    </tr>

@endforeach
<script>
    $(document).ready(function(){
        $('.href_city').unbind().bind('click',function(){
            $('#destino_inicial').val($(this).attr('data-name'));
            $('#id_destino_inicial').val($(this).attr('data-id'));
            $('#myModal').modal('hide');
        });
    });
</script>