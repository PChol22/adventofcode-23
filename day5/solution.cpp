#include <fstream>
#include <iostream>
#include <string>
#include <vector>
#include <cmath>

void firstProblem(std::vector<std::string> &lines)
{
    std::string seedsDelimiter = ": ";
    lines[0].erase(0, lines[0].find(seedsDelimiter) + seedsDelimiter.length());

    std::string numbersDelimiter = " ";

    std::vector<long> seeds;
    size_t pos = 0;

    while ((pos = lines[0].find(numbersDelimiter)) != std::string::npos)
    {
        seeds.push_back(std::stol(lines[0].substr(0, pos)));
        lines[0].erase(0, pos + numbersDelimiter.length());
    }
    seeds.push_back(std::stol(lines[0]));

    std::vector<std::vector<std::vector<long>>> maps;

    for (long i = 1; i < lines.size(); i++)
    {
        std::string line = lines[i];

        if (!std::isdigit(line[0]))
        {
            std::vector<std::vector<long>> map;
            maps.push_back(map);
            continue;
        }

        std::vector<long> map;
        size_t pos = 0;

        while ((pos = line.find(numbersDelimiter)) != std::string::npos)
        {
            map.push_back(std::stol(line.substr(0, pos)));
            line.erase(0, pos + numbersDelimiter.length());
        }
        map.push_back(std::stol(line.substr(0, pos)));

        maps[maps.size() - 1].push_back(map);
    }

    long solution = 1000000000000000;

    for (long i = 0; i < seeds.size(); i++)
    {
        long seed = seeds[i];
        for (long j = 0; j < maps.size(); j++)
        {
            std::vector<long> map;
            bool found = false;
            for (long k = 0; k < maps[j].size(); k++)
            {
                if (seed >= maps[j][k][1] && seed < maps[j][k][1] + maps[j][k][2])
                {
                    map = maps[j][k];
                    found = true;
                }
            }

            if (found)
            {
                seed = map[0] + seed - map[1];
            }
        }

        if (seed < solution)
        {
            solution = seed;
        }
    }

    std::cout << solution << std::endl;
}

void secondProblem(std::vector<std::string> &lines)
{
    std::string seedsDelimiter = ": ";
    lines[0].erase(0, lines[0].find(seedsDelimiter) + seedsDelimiter.length());

    std::string numbersDelimiter = " ";

    std::vector<long> seeds;
    size_t pos = 0;

    while ((pos = lines[0].find(numbersDelimiter)) != std::string::npos)
    {
        seeds.push_back(std::stol(lines[0].substr(0, pos)));
        lines[0].erase(0, pos + numbersDelimiter.length());
    }
    seeds.push_back(std::stol(lines[0]));

    std::vector<std::vector<std::vector<long>>> maps;

    for (long i = 1; i < lines.size(); i++)
    {
        std::string line = lines[i];

        if (!std::isdigit(line[0]))
        {
            std::vector<std::vector<long>> map;
            maps.push_back(map);
            continue;
        }

        std::vector<long> map;
        size_t pos = 0;

        while ((pos = line.find(numbersDelimiter)) != std::string::npos)
        {
            map.push_back(std::stol(line.substr(0, pos)));
            line.erase(0, pos + numbersDelimiter.length());
        }
        map.push_back(std::stol(line.substr(0, pos)));

        maps[maps.size() - 1].push_back(map);
    }

    std::vector<long> map;
    bool found = false;

    for (long i = 0; i < 1000000000000000; i++)
    {
        long goal = std::stol(std::to_string(i));
        for (long j = maps.size() - 1; j >= 0; j--)
        {
            found = false;
            for (long k = 0; k < maps[j].size(); k++)
            {
                if (goal >= maps[j][k][0] && goal < maps[j][k][0] + maps[j][k][2])
                {
                    map = maps[j][k];
                    found = true;
                }
            }

            if (found)
            {
                goal = map[1] + goal - map[0];
            }
        }

        for (long j = 0; j < seeds.size() / 2; j++)
        {
            if (goal >= seeds[j * 2] && (goal < seeds[j * 2] + seeds[j * 2 + 1]))
            {
                std::cout << i << std::endl;
                return;
            }
        }
    }
}

int main()
{
    std::ifstream myFile;

    myFile.open("input.txt");

    if (!myFile.is_open())
    {
        std::cout << "Unable to open file" << std::endl;
        return 1;
    }

    std::string line;
    std::vector<std::string> lines1;
    std::vector<std::string> lines2;

    while (std::getline(myFile, line))
    {
        if (line.empty())
        {
            std::getline(myFile, line);

            if (line.empty())
            {
                break;
            }
        }

        lines1.push_back(line);
    }

    firstProblem(lines1);

    myFile.close();
    myFile.open("input.txt");

    while (std::getline(myFile, line))
    {
        if (line.empty())
        {
            std::getline(myFile, line);

            if (line.empty())
            {
                break;
            }
        }

        lines2.push_back(line);
    }

    secondProblem(lines2);

    return 0;
}
