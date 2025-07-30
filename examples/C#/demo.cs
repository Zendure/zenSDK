/*
 * @Author: dav1d wei.liu@zendure.com
 * @Date: 2025-03-05 14:14:26
 * @LastEditors: dav1d wei.liu@zendure.com
 * @LastEditTime: 2025-03-05 14:15:24
 * @FilePath: /zenSDK/examples/C#/demo.cpp
 * @Description: 
 * 
 * Copyright (c) 2025 by Zendure, All Rights Reserved. 
 */
using System;
using System.Net.Http;
using System.Threading.Tasks;

class Program {
    static async Task Main() {
        var client = new HttpClient();

        // GET 请求
        var getResponse = await client.GetStringAsync("http://<server-ip>/properties/report");
        Console.WriteLine(getResponse);

        // POST 请求
        var json = new StringContent("{\"sn\": \"your_device_sn\", \"properties\": {\"acMode\": 2}}",
                                     System.Text.Encoding.UTF8, "application/json");
        var postResponse = await client.PostAsync("http://<server-ip>/properties/write", json);
        Console.WriteLine(await postResponse.Content.ReadAsStringAsync());
    }
}