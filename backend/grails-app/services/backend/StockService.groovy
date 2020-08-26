package backend

import grails.gorm.transactions.Transactional;
import java.text.SimpleDateFormat;
import java.time.format.DateTimeFormatter;

@Transactional
class StockService {

    def serviceMethod() {

    }

    def getStocks(String company, int horas){
        long start = System.currentTimeMillis();  

        SimpleDateFormat formatter = new SimpleDateFormat("dd/MM/yyyy HH:mm");
         
        Calendar horaInicial = Calendar.getInstance(); 
        horaInicial.setTime(new Date()); 
        horaInicial.add(Calendar.HOUR_OF_DAY, -horas);  
        
        List<Stock> list = Stock.list().findAll{ it.company.name == company.toLowerCase() && ( horaInicial.getTime().getTime() - formatter.parse(it.priceDate).getTime() <= 0 )};

        for(Stock item: list){
            println item as grails.converters.JSON;
        }
        
        println 'Time: ' + System.currentTimeMillis() - start;
        println 'Number of quotes: ' + list.size();
        return list;
    }
}
