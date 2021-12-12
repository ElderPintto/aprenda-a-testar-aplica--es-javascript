import { queryString, parse } from './queryString';

describe('Object to query String', () => {
    
    it('should create a valide query string', () => {
        const obj = {
            name: 'Fabio',
            profession: 'Developer'
        }

        expect(queryString(obj)).toBe(
            'name=Fabio&profession=Developer'
        )
        
    });

    it('should create a valid query string even when an array is passed as value', () => {
        const obj = {
          name: 'Fabio',
          abilities: ['JS', 'TDD'],
        };
    
        expect(queryString(obj)).toBe('name=Fabio&abilities=JS,TDD');
    });

    it('should create a valide query string 2', () => {
        const obj = {
            name: 'Fabio',
            abilities: {
                a:'JS',
                b: 'TDD'
            }
        }

        expect(() => {
            queryString(obj)
        }).toThrowError();

    });

});


describe('Query string to object', () => {
    it('should convert a queryString to Object', () => {

        const strg = 'name=Fabio&profession=Developer'

        expect(parse(strg)).toEqual({
            name: 'Fabio',
            profession: 'Developer'
        })
    });

    it('should convert a queryString of a single key-values', () => {

        const strg = 'name=Fabio'

        expect(parse(strg)).toEqual({
            name: 'Fabio',
        })
    });

    it('should convert a queryString of any key-values', () => {

        const strg = 'name=Fabio&abilities=JS,TDD'

        expect(parse(strg)).toEqual({
            name: 'Fabio',
            abilities: ['JS', 'TDD'],
        })
    });
});