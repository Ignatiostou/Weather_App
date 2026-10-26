import {APP,WEATHER_API} from "@/config";
import {openWeatherApi} from "@/api";
import {useEffect,useCallback,useState} from "react"; 
import {Dialog,DialogTrigger,DialogContent,DialogTitle,DialogDescription,DialogClose,DialogHeader} from "@/components/ui/dialog";
import {Button} from "@/components/ui/button";
import {Kbd,KbdGroup} from "@/components/ui/kbd";
import {InputGroup,InputGroupAddon,InputGroupInput} from "@/components/ui/input-group";
import {Item,ItemContent,ItemTitle,ItemDescription,ItemActions,ItemGroup} from "@/components/ui/item";
import {MapPinnedIcon,SearchIcon} from "lucide-react";
import { useWeather } from "@/hooks/useWeather";

import type { Geocoding } from "@/types";

export const SearchDialog = () => {

    const { setWeather } = useWeather();

    const [search,setSearch]=useState<string>('');
    const [results,setResults]=useState<Geocoding[]>([]);
    const [isOpen,setIsOpen]=useState<boolean>(false);

    //Function to select a location
    const selectLocation = (result: Geocoding) => {
        setWeather({ lat: result.lat, lon: result.lon });
        localStorage.setItem(APP.STORE_KEY.LAT, result.lat.toString());
        localStorage.setItem(APP.STORE_KEY.LON, result.lon.toString());
        setSearch('');
        setIsOpen(false);
    };

    //Search request

    const geocoding=useCallback(async(search:string)=>{
        if(search.trim()==='') return [];
        try{
            const response=await openWeatherApi.get('/geo/1.0/direct',{
                params:{
                    q:search,
                    limit:WEATHER_API.DEFAULTS.SEARCH_RESULT_LIMIT,
                },
            });
            return response.data as Geocoding[];
        }catch(error){
            console.error('Geocoding error:', error);
            return [];
        }
    },[]);

    //Keyboard shortcut for opening the search dialog
    useEffect(()=>{
        const handleKeyDown=(e:KeyboardEvent)=>{
            if(e.ctrlKey && e.key.toLowerCase()==='k'){
                e.preventDefault();
                setIsOpen((prev)=>!prev);
            }
        };
        window.addEventListener('keydown', handleKeyDown);
        return () => {
            window.removeEventListener('keydown', handleKeyDown);
        };
    },[]);

    //Search Function
    useEffect(()=>{
        if(search.trim()==='') {
            setResults([]);
            return;
        }
        (async()=>{
            const results=await geocoding(search);
            if(results){
                setResults(results);
            }
        })();
    },[search,geocoding]);



    return(
        <Dialog open={isOpen} onOpenChange={setIsOpen}>
            <DialogTrigger asChild>
                <Button variant="ghost" 
                size="sm" 
                className="dark:lg:bg-secondary/50"
                onClick={()=>setIsOpen((prev)=>!prev)}>

                    <SearchIcon className="mr-2 h-4 w-4" />
                    <div className='flex justify-between w-[250px] lg:w-auto max-lg:hidden'>
                        Search
                        <KbdGroup>
                            <Kbd>Ctrl</Kbd>
                            <Kbd>K</Kbd>
                        </KbdGroup>

                    </div>
                </Button>
            </DialogTrigger>

            <DialogContent
            className='p-0 bg-card gap-0
            w-full max-w-md'
            showCloseButton={false}
            >
                <DialogHeader
                className='sr-only'>
                    <DialogTitle>Search for a location</DialogTitle>
                    <DialogDescription>
                        Enter a location to get the weather information.
                    </DialogDescription>
                </DialogHeader>
                <InputGroup className='ring-0 border-t-0 border-x-0 border-b border-border rounded-b-none bg-transparent'>
                    <InputGroupInput
                        value={search}
                        onChange={(e) => setSearch(e.target.value)}
                        placeholder="Enter a location"
                        onKeyDown={(e) => {
                            if (e.key === 'Enter' && results.length > 0) {
                                e.preventDefault();
                                selectLocation(results[0]);
                            }
                        }}
                    />
                    <InputGroupAddon align="inline-end">
                        <SearchIcon className="h-4 w-4" />
                        <Kbd className="ml-2">Enter</Kbd>
                    </InputGroupAddon>
                </InputGroup>
                <ItemGroup className="min-h-80 p-2">
                    {results.length===0 && search.trim()!=='' ? (
                        <div className="text-center text-muted-foreground">
                            No results found for "{search}"
                        </div>
                    ) : null}
                    {results.map((result) => (
                        <Item key={result.name} 
                        size='sm'
                        className="group relative p-2 cursor-pointer hover:bg-accent/50 transition-colors"
                        onClick={() => selectLocation(result)}>
                            <ItemContent>
                                <ItemTitle>{result.name}</ItemTitle>
                                <ItemDescription>
                                    {result.state ? `${result.state}, ` : ''}
                                    {result.country}
                                    </ItemDescription>
                            </ItemContent>
                            <ItemActions>
                                <MapPinnedIcon className="h-4 w-4 opacity-50 group-hover:opacity-100 transition-opacity" />
                            </ItemActions>
                        </Item>
                    ))}
                </ItemGroup>
            </DialogContent>
        </Dialog>
    )
};