#include <fstream>
#include <iostream>
#include <string>
#include <vector>
#include <map>

std::map<std::string, char> words{
    {"one", '1'},
    {"two", '2'},
    {"three", '3'},
    {"four", '4'},
    {"five", '5'},
    {"six", '6'},
    {"seven", '7'},
    {"eight", '8'},
    {"nine", '9'}};

void firstProblem(std::vector<std::string> &lines)
{
    int solution = 0;

    for (int i = 0; i < lines.size(); i++)
    {
        std::string line = lines[i];
        std::vector<char> numbers;

        for (int i = 0; i < line.length(); i++)
        {
            if (std::isdigit(line[i]))
            {
                numbers.push_back(line[i]);
            }
        }

        std::string combined = "";
        combined += numbers[0];
        combined += numbers[numbers.size() - 1];

        solution += std::stoi(combined);
    }

    std::cout << solution << std::endl;
}

void secondProblem(std::vector<std::string> &lines)
{
    int solution = 0;

    for (int i = 0; i < lines.size(); i++)
    {
        std::string line = lines[i];
        std::vector<char> numbers;

        for (int k = 0; k < line.length(); k++)
        {
            if (std::isdigit(line[k]))
            {
                numbers.push_back(line[k]);
            }

            for (int j = 1; j < line.length() - k; j++)
            {
                std::string sub = line.substr(k, j);
                std::map<std::string, char>::iterator mapIterator = words.find(sub);

                if (mapIterator != words.end())
                {
                    numbers.push_back(mapIterator->second);
                    break;
                }
            }
        }

        std::string combined = "";
        combined += numbers[0];
        combined += numbers[numbers.size() - 1];

        solution += std::stoi(combined);
    }

    std::cout << solution << std::endl;
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
    std::vector<std::string> lines;

    while (std::getline(myFile, line))
    {
        if (line.empty())
        {
            break;
        }

        lines.push_back(line);
    }

    firstProblem(lines);
    secondProblem(lines);

    return 0;
}
