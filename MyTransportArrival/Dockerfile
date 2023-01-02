FROM mcr.microsoft.com/dotnet/aspnet:6.0 AS base
WORKDIR /app
EXPOSE 80
EXPOSE 443

FROM mcr.microsoft.com/dotnet/sdk:6.0 AS build
WORKDIR /src
COPY ["MyTransportArrival/MyTransportArrival.csproj", "MyTransportArrival/"]
RUN dotnet restore "MyTransportArrival/MyTransportArrival.csproj"
COPY . .
WORKDIR "/src/MyTransportArrival"
RUN dotnet build "MyTransportArrival.csproj" -c Release -o /app/build

FROM build AS publish
RUN dotnet publish "MyTransportArrival.csproj" -c Release -o /app/publish

FROM base AS final
WORKDIR /app
COPY --from=publish /app/publish .
ENTRYPOINT ["dotnet", "MyTransportArrival.dll"]
