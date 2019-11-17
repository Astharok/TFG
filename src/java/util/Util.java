package util;

import com.google.gson.Gson;
import com.google.gson.GsonBuilder;
import java.util.List;

public class Util {
    
    public static String toJson(Object json) {

        GsonBuilder builder = new GsonBuilder();
        builder.setPrettyPrinting();

        Gson gson = builder.create();
        String resp = gson.toJson(json);
        return resp;
    }
    
    public static <J> String toJson(List<J> json) {

        GsonBuilder builder = new GsonBuilder();
        builder.setPrettyPrinting();

        Gson gson = builder.create();
        String resp = gson.toJson(json);
        return resp;
    }
    
}
