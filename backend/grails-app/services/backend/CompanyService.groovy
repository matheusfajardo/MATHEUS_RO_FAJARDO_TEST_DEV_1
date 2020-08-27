package backend

import grails.gorm.transactions.Transactional;
import java.text.SimpleDateFormat;
import java.time.format.DateTimeFormatter;

@Transactional
class CompanyService {

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

    def getCompaniesWithDeviation(){        
        def list = Stock.list().groupBy { it.company.id };
        def listaRetorno = [];
        def company;
        for(item in list){
            def dadosCompany = item.value.first().company;
            listaRetorno << ['company':dadosCompany.name, 'segment':dadosCompany.segment, 'deviation': standarDeviation(item.value)];
        }
        
        return listaRetorno;
    }

    private double getMedia(item){
        double sum = 0;
        for(i in item){
            sum += i.price.toInteger();            
        }

        return sum/item.size();
    }

    private double getVariancia(item){
        double temp = 0;
        double media = getMedia(item);
        for(i in item){
            temp += (i.price.toInteger()-media)*(i.price.toInteger()-media);
        }

        return temp/(item.size()-1);
    }

    private double standarDeviation(item){
        return Math.sqrt(getVariancia(item));
    }
}
