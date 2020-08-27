package backend

import java.text.SimpleDateFormat;
import java.time.LocalDate;
import java.time.LocalDateTime;
import java.time.format.DateTimeFormatter;
import java.time.ZoneId;

class BootStrap {
    Company company;

    def init = { servletContext ->
        new Company(name: 'ford', segment: 'Vehicle').save();
        new Company(name: 'apple', segment: 'IT').save();
        new Company(name: 'nissan', segment: 'Vehicle').save();
        
        Date now = new Date();        
        Calendar mesInicial = Calendar.getInstance(); 
        mesInicial.setTime(new Date()); 
        mesInicial.add(Calendar.DAY_OF_MONTH, -30);
        
        while((now.getTime() - mesInicial.getTime().getTime()) > 0) { 
            if(mesInicial.get(Calendar.HOUR_OF_DAY) < 10) {
                
                mesInicial.set(Calendar.HOUR_OF_DAY, 10);
                mesInicial.set(Calendar.MINUTE, 0);
            }
            else if(mesInicial.get(Calendar.HOUR_OF_DAY) > 18 
                || (mesInicial.get(Calendar.HOUR_OF_DAY) == 18 && mesInicial.get(Calendar.MINUTE) > 0)) {
                
                mesInicial.add(Calendar.DAY_OF_MONTH, 1);
                mesInicial.set(Calendar.HOUR_OF_DAY, 10);
                mesInicial.set(Calendar.MINUTE, 0);
            }
            else {
                this.newStock(mesInicial, Company.list());
                 
                mesInicial.add(Calendar.MINUTE, 1);
            }            
        }        
    }
    
    def destroy = {
    }

    private newStock(Calendar mesInicial, List<Company> companys){
        String dia = mesInicial.get(Calendar.DAY_OF_MONTH);
        String mes = (mesInicial.get(Calendar.MONTH) + 1 < 10 ? '0' + (mesInicial.get(Calendar.MONTH) + 1) : mesInicial.get(Calendar.MONTH).toInteger() + 1);
        String ano = mesInicial.get(Calendar.YEAR);
        String hora = mesInicial.get(Calendar.HOUR_OF_DAY);
        String minutos = (mesInicial.get(Calendar.MINUTE) < 10 ? '0' + mesInicial.get(Calendar.MINUTE) : mesInicial.get(Calendar.MINUTE));

        String dateFormatted = dia +'/'+mes+'/'+ano+' '+hora+':'+minutos;

        for(Company company: companys){
            new Stock(price: new Random().nextInt(99 - 40), priceDate: dateFormatted, company: company).save();
        }
    }
}
